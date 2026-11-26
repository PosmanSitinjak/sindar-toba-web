import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = payload || {};

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json({ ok: false, error: "Gateway not configured" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 403 });
    }

    let nextStatus = "Menunggu Verifikasi";
    if (
      transaction_status === "settlement" ||
      (transaction_status === "capture" && fraud_status === "accept")
    ) {
      nextStatus = "Lunas (Siap Digunakan)";
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      nextStatus = "Dibatalkan / Kedaluwarsa";
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && order_id) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
      await supabaseAdmin
        .from("tickets")
        .update({ status: nextStatus })
        .eq("booking_code", order_id);
    }

    return NextResponse.json({ ok: true, status: nextStatus });
  } catch (err) {
    console.error("Midtrans webhook error:", err);
    return NextResponse.json({ ok: false, error: "Webhook error" }, { status: 500 });
  }
}
