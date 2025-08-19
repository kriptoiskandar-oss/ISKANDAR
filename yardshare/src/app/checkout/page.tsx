import { redirect } from "next/navigation";

export default async function CheckoutPage({ searchParams }: { searchParams: Record<string, string> }) {
  const { listingId, date, start, end } = searchParams || {};
  if (!listingId || !date || !start || !end) {
    redirect("/browse");
  }
  // Placeholder page. In a full implementation, this would call an API route to create a Stripe Checkout Session
  // and then redirect to it on the client.
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <p className="mt-2 text-gray-700">Stripe integration pending. Selected listing: {listingId}</p>
    </div>
  );
}

