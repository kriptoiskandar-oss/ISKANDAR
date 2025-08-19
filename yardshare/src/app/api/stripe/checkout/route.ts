import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });

export async function POST(request: Request) {
  try {
    const { listingId, renterId, date, startTime, endTime, totalAmount } = await request.json();
    if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    if (!listingId || !renterId || !date || !startTime || !endTime || !totalAmount) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        renterId,
        listingId,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        totalAmount,
        status: "PENDING",
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Yard booking" },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: { bookingId: booking.id },
      },
      metadata: { bookingId: booking.id },
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?bookingId=${booking.id}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel?bookingId=${booking.id}`,
    });

    return NextResponse.json({ url: session.url }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Unable to create checkout session" }, { status: 500 });
  }
}

