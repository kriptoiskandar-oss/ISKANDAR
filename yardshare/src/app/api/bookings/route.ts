import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const payload = await request.json();
  const booking = await prisma.booking.create({ data: payload });
  return NextResponse.json(booking, { status: 201 });
}

