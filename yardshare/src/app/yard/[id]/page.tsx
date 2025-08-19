import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BookingForm } from "@/components/BookingForm";

type YardPageProps = { params: { id: string } };

export default async function YardDetailsPage({ params }: YardPageProps) {
  const data = await prisma.listing.findUnique({ where: { id: params.id } });
  if (!data) return notFound();
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="md:col-span-3 overflow-hidden rounded-lg border">
          <img src={data.images?.[0] || "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80"} alt={data.title} className="w-full object-cover" />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="mt-2 text-gray-700">{data.description}</p>
          <p className="mt-4 text-lg font-semibold">${data.pricePerHour}/hr</p>
          <BookingForm listingId={data.id} pricePerHour={data.pricePerHour} />
        </div>
      </div>
    </div>
  );
}

