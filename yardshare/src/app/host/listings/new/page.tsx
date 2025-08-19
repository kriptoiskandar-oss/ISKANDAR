"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewListingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", city: "", pricePerHour: 25, category: "event", images: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setSubmitting(true);
    const payload = {
      ...form,
      pricePerHour: Number(form.pricePerHour),
      images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
      hostId: (session as any).userId,
    };
    const res = await fetch("/api/listings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSubmitting(false);
    if (res.ok) {
      router.push("/host/dashboard");
    }
  };

  if (status === "loading") return null;
  if (!session) {
    return (
      <div className="py-6">
        <p>Please <a className="text-primary-600 underline" href="/auth/signin">sign in</a> to create a listing.</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold">Create Listing</h1>
      <form onSubmit={onSubmit} className="mt-6 grid max-w-2xl grid-cols-1 gap-4">
        <input className="rounded border px-3 py-2" placeholder="Title" value={form.title} onChange={(e)=>setForm({ ...form, title: e.target.value })} required />
        <textarea className="rounded border px-3 py-2" placeholder="Description" value={form.description} onChange={(e)=>setForm({ ...form, description: e.target.value })} required rows={4} />
        <input className="rounded border px-3 py-2" placeholder="City" value={form.city} onChange={(e)=>setForm({ ...form, city: e.target.value })} required />
        <input className="rounded border px-3 py-2" type="number" placeholder="Price per hour" value={form.pricePerHour} onChange={(e)=>setForm({ ...form, pricePerHour: Number(e.target.value) })} min={1} />
        <select className="rounded border px-3 py-2" value={form.category} onChange={(e)=>setForm({ ...form, category: e.target.value })}>
          <option value="event">Event</option>
          <option value="parking">Parking</option>
          <option value="photoshoot">Photoshoot</option>
        </select>
        <input className="rounded border px-3 py-2" placeholder="Image URLs (comma separated)" value={form.images} onChange={(e)=>setForm({ ...form, images: e.target.value })} />
        <button disabled={submitting} className="rounded bg-primary-600 px-4 py-2 font-medium text-white">{submitting ? "Creating..." : "Create"}</button>
      </form>
    </div>
  );
}

