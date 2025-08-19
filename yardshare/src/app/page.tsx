export default function HomePage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Rent or list your backyard</h1>
        <p className="mt-4 text-lg text-gray-600">Find unique outdoor spaces for events, parking, photoshoots, and more.</p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/browse" className="rounded bg-primary-600 px-5 py-2.5 font-medium text-white">Browse Yards</a>
          <a href="/host" className="rounded border border-gray-300 px-5 py-2.5 font-medium">Become a Host</a>
        </div>
      </div>
    </section>
  );
}

