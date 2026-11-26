import { NextRequest, NextResponse } from "next/server";

type PaymentChannel = "qris" | "va_sumut" | "va_mandiri" | "va_bca";

interface CheckoutPayload {
  orderId: string;
  amount: number;
  itemTitle: string;
  quantity: number;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  paymentMethod: PaymentChannel;
}

const CHANNEL_TO_MIDTRANS: Record<PaymentChannel, string[]> = {
  qris: ["other_qris", "gopay", "shopeepay"],
  va_bca: ["bca_va"],
  va_mandiri: ["echannel"],
  va_sumut: ["permata_va", "bni_va", "bri_va"],
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutPayload;
    const {
      orderId,
      amount,
      itemTitle,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
    } = body;

    if (!orderId || !amount || amount <= 0 || !itemTitle || !customerName) {
      return NextResponse.json(
        { ok: false, error: "Data pesanan tidak lengkap." },
        { status: 400 }
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

    if (serverKey && clientKey) {
      const snapBaseUrl = isProduction
        ? "https://app.midtrans.com/snap/v1/transactions"
        : "https://app.sandbox.midtrans.com/snap/v1/transactions";

      const authHeader = Buffer.from(`${serverKey}:`).toString("base64");
      const safeItemName = itemTitle.slice(0, 50);

      const midtransRes = await fetch(snapBaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${authHeader}`,
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: orderId,
            gross_amount: Math.round(amount),
          },
          item_details: [
            {
              id: orderId,
              price: Math.round(amount / Math.max(1, quantity)),
              quantity: Math.max(1, quantity),
              name: safeItemName,
            },
          ],
          customer_details: {
            first_name: customerName,
            email: customerEmail || undefined,
            phone: customerPhone,
          },
          enabled_payments: CHANNEL_TO_MIDTRANS[paymentMethod] || ["other_qris", "bca_va"],
        }),
      });

      const midtransData = await midtransRes.json();
      if (!midtransRes.ok || !midtransData?.token) {
        return NextResponse.json(
          {
            ok: false,
            error:
              midtransData?.error_messages?.[0] ||
              "Gagal membuat transaksi pada payment gateway.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        mode: "midtrans",
        token: midtransData.token,
        redirectUrl: midtransData.redirect_url,
        clientKey,
        isProduction,
      });
    }

    // Fallback ke transfer manual / QRIS BPODT terverifikasi (tanpa mode demo palsu)
    const uniqueCode = Math.floor(100 + Math.random() * 899);
    return NextResponse.json({
      ok: true,
      mode: "manual",
      paymentRef: orderId,
      uniqueCode,
      finalAmount: Math.round(amount) + uniqueCode,
    });
  } catch (err) {
    console.error("Payment checkout error:", err);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan saat memproses checkout." },
      { status: 500 }
    );
  }
}
