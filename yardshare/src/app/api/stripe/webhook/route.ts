import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return NextResponse.json({ error: "Missing Stripe config" }, { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = (session.metadata && session.metadata["bookingId"]) || (session.payment_intent as any)?.metadata?.bookingId;
    if (bookingId) {
      await prisma.booking.update({ where: { id: bookingId }, data: { status: "CONFIRMED", paymentId: session.payment_intent as string } });
    }
  }

  return NextResponse.json({ received: true });
}

export const dynamic = "force-dynamic";

