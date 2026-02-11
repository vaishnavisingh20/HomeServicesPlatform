"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BookingPage() {
  const { serviceId } = useParams();
  const router = useRouter();

  const [service, setService] = useState(null);
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    address: "",
    scheduledAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/services`
        );
        const data = await res.json();

        const foundService = data.find(
          (s) => s._id === serviceId
        );

        setService(foundService);
      } catch (error) {
        console.error("Failed to load service");
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const getBackgroundImage = () => {
    if (!service) return "/default-bg.jpg";

    const title = service.title.toLowerCase();

    if (title.includes("ac")) return "/ac-service.webp";
    if (title.includes("salon")) return "/salon-service.png";
    if (title.includes("plumber")) return "/plumber.jpg";
    if (title.includes("electrician")) return "/electrician.jpg";
    if (title.includes("clean")) return "/bathroom.jpg";

    return "/default-bg.jpg";
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          serviceId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/booking/success/${data.booking._id}`);
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
<div
  className="min-h-[calc(100vh-64px)] text-black"
  style={{
    backgroundImage: `url('${getBackgroundImage()}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

      <div className="min-h-[calc(100vh-64px)] bg-white/80 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-2 text-center">
            Book {service ? service.title : "Service"}
          </h1>

          <p className="text-center mb-6">
            {service ? service.category : ""}
          </p>

          <input
            type="text"
            name="customerName"
            placeholder="Your Name"
            value={form.customerName}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-black rounded"
            required
          />

          <input
            type="text"
            name="customerPhone"
            placeholder="Phone Number"
            value={form.customerPhone}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-black rounded"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-black rounded"
            required
          />

          <input
            type="datetime-local"
            name="scheduledAt"
            value={form.scheduledAt}
            onChange={handleChange}
            className="w-full mb-4 p-2 border border-black rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
            }`}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>

          {message && (
            <p className="mt-4 text-center font-medium">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
