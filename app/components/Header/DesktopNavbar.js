export default function DesktopNavbar() {
  return (
    <header className="bg-white shadow-sm py-3 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-700">My Lungi Shop</div>

      <div className="w-1/2">
        <input
          type="text"
          placeholder="Search lungi..."
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <nav className="space-x-6 text-sm">
        <a>Home</a>
        <a href="/category/premium">Premium</a>
        <a href="/checkout/cart">Cart</a>
      </nav>
    </header>
  );
}
