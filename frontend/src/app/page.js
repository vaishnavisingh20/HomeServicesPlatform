export default function HomePage() {
  return (
    <div
      className="min-h-[calc(100vh-64px)] text-black"
      style={{
        backgroundImage: "url('/front-page.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-[calc(100vh-64px)] bg-white/70 flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-6">
          Home Services Platform
        </h1>

        <p className="mb-8 text-lg text-center max-w-xl">
          Book trusted home services like AC repair, plumbing, cleaning, and more — all from one place.
        </p>

        <a
          href="/services"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Explore Services
        </a>
      </div>
    </div>
  );
}
