async function getServices() {
  const res = await fetch("http://127.0.0.1:5000/api/services", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div
      className="min-h-screen text-black"
      style={{
        backgroundImage: "url('/home-services.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-screen bg-white/80 px-10 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Available Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold mb-3">
                {service.title}
              </h2>

              <p className="mb-3">
                {service.description}
              </p>

              <p className="text-sm mb-2">
                Category: {service.category}
              </p>

              <p className="font-bold text-lg mb-6">
                ₹{service.basePrice}
              </p>

              <a
                href={`/booking/${service._id}`}
                className="inline-block bg-black text-white px-5 py-2 rounded hover:opacity-90 transition"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
