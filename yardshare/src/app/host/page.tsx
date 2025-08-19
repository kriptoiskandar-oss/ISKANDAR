import Link from "next/link";

export default function HostLandingPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold">Become a Host</h1>
      <p className="mt-2 text-gray-700">List your yard and start earning income.</p>
      <div className="mt-6">
        <Link href="/host/dashboard" className="rounded bg-primary-600 px-4 py-2 font-medium text-white">Go to Dashboard</Link>
      </div>
    </div>
  );
}

