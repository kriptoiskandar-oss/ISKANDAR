export default function CheckoutSuccessPage({ searchParams }: { searchParams: Record<string, string> }) {
  const bookingId = searchParams?.bookingId;
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold">Payment successful</h1>
      <p className="mt-2 text-gray-700">Your booking {bookingId ? `(${bookingId})` : ""} is confirmed.</p>
      <a href="/host/dashboard" className="mt-6 inline-block rounded bg-primary-600 px-4 py-2 font-medium text-white">Go to Dashboard</a>
    </div>
  );
}

