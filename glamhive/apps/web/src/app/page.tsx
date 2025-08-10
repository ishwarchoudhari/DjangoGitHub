import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">GlamHive</h1>
          <p className="mt-4 text-lg text-gray-600">
            Beauty services, cosmetics, and social — inspired by Instagram × Zomato
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a className="rounded-lg bg-black px-5 py-3 text-white" href="#artists">Browse Artists</a>
            <a className="rounded-lg border px-5 py-3" href="#cosmetics">Buy Cosmetics</a>
            <a className="rounded-lg border px-5 py-3" href="#videos">Watch Videos</a>
          </div>
        </div>
      </section>
    </main>
  );
}
