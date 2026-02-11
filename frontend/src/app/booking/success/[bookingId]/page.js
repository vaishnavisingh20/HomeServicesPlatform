"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SuccessPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/bookings/${bookingId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch booking");
        }

        const data = await res.json();
        setBooking(data);
      } catch (err) {
        setError("Could not load booking details.");
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        <p>{error}</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black">
        <p>Loading booking details...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-black"
      style={{
        backgroundImage: "url('/success.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-screen bg-white/80 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-6">
            Booking Confirmed 🎉
          </h1>

          <div className="text-left space-y-3 mb-6">
            <p><strong>Service:</strong> {booking.serviceId.title}</p>
            <p><strong>Name:</strong> {booking.customerName}</p>
            <p><strong>Phone:</strong> {booking.customerPhone}</p>
            <p><strong>Address:</strong> {booking.address}</p>
            <p>
              <strong>Scheduled At:</strong>{" "}
              {new Date(booking.scheduledAt).toLocaleString()}
            </p>
            <p><strong>Status:</strong> {booking.status}</p>
          </div>

          <a
            href="/services"
            className="inline-block bg-black text-white px-6 py-2 rounded"
          >
            Back to Services
          </a>
        </div>
      </div>
    </div>
  );
}
