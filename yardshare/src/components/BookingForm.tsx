"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = { listingId: string; pricePerHour: number };

export function BookingForm({ listingId, pricePerHour }: Props) {
  const { data: session } = useSession();
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!session?.userId) {
      window.location.href = "/auth/signin";
      return;
    }
    if (!date || !start || !end) return;
    setLoading(true);
    try {
      const startDate = new Date(`${date}T${start}:00`);
      const endDate = new Date(`${date}T${end}:00`);
      const hours = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)));
      const totalAmount = hours * pricePerHour * 100 + 100; // includes $1 platform fee
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          renterId: session.userId,
          date: new Date(date).toISOString(),
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
          totalAmount,
        }),
      });
      if (!res.ok) throw new Error("Failed to start checkout");
      const data = await res.json();
      if (data.url) window.location.href = data.url as string;
    } catch (err: any) {
      setError(err.message || "Unable to book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <label className="block text-sm">Date
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required />
      </label>
      <label className="block text-sm">Start time
        <input type="time" value={start} onChange={(e)=>setStart(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required />
      </label>
      <label className="block text-sm">End time
        <input type="time" value={end} onChange={(e)=>setEnd(e.target.value)} className="mt-1 w-full rounded border px-3 py-2" required />
      </label>
      <button disabled={loading} className="w-full rounded bg-primary-600 px-4 py-2 font-medium text-white">{loading ? "Processing..." : "Book & Pay"}</button>
    </form>
  );
}

