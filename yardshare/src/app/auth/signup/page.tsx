"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/users/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSubmitting(false);
    if (res.ok) router.push("/auth/signin");
  };
  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input className="w-full rounded border px-3 py-2" placeholder="Name" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} />
        <input className="w-full rounded border px-3 py-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} />
        <input className="w-full rounded border px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({ ...form, password: e.target.value })} />
        <button disabled={submitting} className="w-full rounded bg-primary-600 px-4 py-2 font-medium text-white">{submitting ? "Creating..." : "Create account"}</button>
      </form>
    </div>
  );
}

