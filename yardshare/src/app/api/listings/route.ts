import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const listings = await prisma.listing.findMany({
    include: { reviews: true },
    orderBy: { createdAt: "desc" },
    take: 24,
  });
  return NextResponse.json(listings);
}

export async function POST(request: Request) {
  const body = await request.json();
  const listing = await prisma.listing.create({ data: body });
  return NextResponse.json(listing, { status: 201 });
}

