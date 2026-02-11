export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center text-black">
      <a href="/" className="text-xl font-bold">
        HomeServices
      </a>

      <div className="space-x-6">
        <a href="/services" className="hover:underline">
          Services
        </a>
      </div>
    </nav>
  );
}
