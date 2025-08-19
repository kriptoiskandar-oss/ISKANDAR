export default function ContactPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="mt-2 text-gray-700">Email us at support@yardshare.app</p>
      <form className="mt-6 max-w-lg space-y-3">
        <input className="w-full rounded border px-3 py-2" placeholder="Your email" />
        <textarea className="w-full rounded border px-3 py-2" placeholder="Message" rows={4} />
        <button className="rounded bg-primary-600 px-4 py-2 font-medium text-white">Send</button>
      </form>
    </div>
  );
}

