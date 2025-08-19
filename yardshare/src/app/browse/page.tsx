import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BrowsePage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  const q = searchParams?.q?.trim();
  const city = searchParams?.city?.trim();
  const min = searchParams?.min ? Number(searchParams.min) : undefined;
  const max = searchParams?.max ? Number(searchParams.max) : undefined;
  const where: any = {};
  if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }];
  if (city) where.city = { contains: city, mode: "insensitive" };
  if (min != null || max != null) where.pricePerHour = { gte: min, lte: max };
  const listings = await prisma.listing.findMany({ where, orderBy: { createdAt: "desc" }, take: 30 });
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold">Browse Yards</h2>
      <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <input name="q" placeholder="Search" className="rounded border px-3 py-2" defaultValue={q} />
        <input name="city" placeholder="City" className="rounded border px-3 py-2" defaultValue={city} />
        <input name="min" placeholder="Min $/hr" className="rounded border px-3 py-2" defaultValue={min} />
        <input name="max" placeholder="Max $/hr" className="rounded border px-3 py-2" defaultValue={max} />
        <button className="rounded bg-primary-600 px-4 py-2 font-medium text-white sm:col-span-1">Filter</button>
      </form>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <Link key={l.id} href={`/yard/${l.id}`} className="group overflow-hidden rounded-lg border">
            <img src={l.images?.[0] || "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"} alt="Yard" className="h-48 w-full object-cover transition group-hover:scale-105" />
            <div className="p-4">
              <h3 className="font-medium">{l.title}</h3>
              <p className="text-sm text-gray-600">{l.city}</p>
              <p className="mt-2 font-semibold">${l.pricePerHour}/hr</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

