export default function HostDashboardPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold">Host Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded border p-4">
          <p className="text-sm text-gray-600">Total Earnings</p>
          <p className="mt-1 text-2xl font-bold">$0.00</p>
        </div>
        <div className="rounded border p-4">
          <p className="text-sm text-gray-600">Active Listings</p>
          <p className="mt-1 text-2xl font-bold">0</p>
        </div>
        <div className="rounded border p-4">
          <p className="text-sm text-gray-600">Upcoming Bookings</p>
          <p className="mt-1 text-2xl font-bold">0</p>
        </div>
      </div>
      <div className="mt-8">
        <a href="/host/listings/new" className="rounded bg-primary-600 px-4 py-2 font-medium text-white">Create Listing</a>
      </div>
    </div>
  );
}

