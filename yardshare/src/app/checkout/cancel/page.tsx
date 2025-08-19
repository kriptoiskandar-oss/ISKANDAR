export default function CheckoutCancelPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold">Payment canceled</h1>
      <p className="mt-2 text-gray-700">You can try again or contact support.</p>
      <a href="/browse" className="mt-6 inline-block rounded bg-primary-600 px-4 py-2 font-medium text-white">Back to Browse</a>
    </div>
  );
}

