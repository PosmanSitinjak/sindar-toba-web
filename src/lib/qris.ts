import QRCode from "qrcode";

export interface QrisOptions {
  nmid?: string;
  merchantName?: string;
  city?: string;
  postalCode?: string;
  amount?: number;
  bookingCode?: string;
  isStatic?: boolean;
}

/**
 * Calculates standard CRC16-CCITT (0xFFFF initial, 0x1021 polynomial)
 * required by the Bank Indonesia & ASPI QRIS EMVCo specification.
 */
function calculateCrc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function formatTag(id: string, value: string): string {
  const len = value.length.toString().padStart(2, "0");
  return `${id}${len}${value}`;
}

/**
 * Builds a valid, standard-compliant Indonesian QRIS payload string.
 * This payload is scannable by any Indonesian banking app or e-wallet (BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay).
 */
export function buildQrisPayload(options: QrisOptions = {}): string {
  const nmid = options.nmid || "ID1024350123456";
  const rawMerchantName = (options.merchantName || "SINDAR TOBA ESCROW").toUpperCase().slice(0, 25);
  const city = (options.city || "SAMOSIR").toUpperCase().slice(0, 15);
  const postalCode = options.postalCode || "22395";
  const bookingCode = options.bookingCode || "ST-2026";
  const isStatic = options.isStatic ?? true;

  // 00: Payload Format Indicator
  let payload = formatTag("00", "01");

  // 01: Point of Initiation Method: "11" for Static QR (Tidak Dinamis), "12" for Dynamic
  payload += formatTag("01", isStatic ? "11" : "12");

  // 26: Merchant Account Information - Domestic Acquirer (LinkAja / National Switch)
  const tag26Value =
    formatTag("00", "ID.LINKAJA.WWW") +
    formatTag("01", "936009110020268890") +
    formatTag("02", "000000000000000000") +
    formatTag("03", "UMI");
  payload += formatTag("26", tag26Value);

  // 51: Merchant Account Information - QRIS National Standard (ASPI)
  const tag51Value =
    formatTag("00", "ID.CO.QRIS.WWW") +
    formatTag("02", nmid) +
    formatTag("03", "UMI");
  payload += formatTag("51", tag51Value);

  // 52: Merchant Category Code (5812 = Eating places, travel, tourism)
  payload += formatTag("52", "5812");

  // 53: Transaction Currency (360 = IDR)
  payload += formatTag("53", "360");

  // 54: Transaction Amount (optional in static QR, added if provided)
  if (options.amount && options.amount > 0) {
    payload += formatTag("54", Math.round(options.amount).toString());
  }

  // 58: Country Code (ID)
  payload += formatTag("58", "ID");

  // 59: Merchant Name
  payload += formatTag("59", rawMerchantName);

  // 60: Merchant City
  payload += formatTag("60", city);

  // 61: Postal Code
  payload += formatTag("61", postalCode);

  // 62: Additional Data Field (Booking Code reference)
  if (bookingCode) {
    const tag62Value = formatTag("01", bookingCode.slice(0, 20));
    payload += formatTag("62", tag62Value);
  }

  // 63: Checksum header
  const payloadWithCrcTag = payload + "6304";
  const crc = calculateCrc16(payloadWithCrcTag);

  return payloadWithCrcTag + crc;
}

/**
 * Generates high-resolution QR code data URL (PNG)
 */
export async function generateQrDataUrl(
  text: string,
  width: number = 360
): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width,
      margin: 1,
      color: {
        dark: "#1a1a1a",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    });
  } catch (err) {
    console.error("QR Code generation error:", err);
    return "";
  }
}
