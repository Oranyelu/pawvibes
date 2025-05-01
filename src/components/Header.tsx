import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import PawVibeLogo from "../assets/PawVibeHeaderLogo.svg";
import { useEffect, useState } from "react";
import clsx from "clsx";

const Header = () => {
  const { toggleDrawer, state } = useCart();
  const cartNotEmpty = state.cart.length > 0;
  const [cartBounce, setCartBounce] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Watch for cart item changes to animate
  useEffect(() => {
    if (state.cart.length > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [state.cart]);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 ">
      <Link to="/">
        <img src={PawVibeLogo} alt="PawVibe Header Logo" className="w-[100px]" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 items-center text-sm font-medium">
        <Link to="/shop" className="text-gray-700 hover:text-green-700">
          Shop
        </Link>

        {/* Cart */}
        <button
          onClick={toggleDrawer}
          className={clsx("relative transition-transform", {
            "animate-bounce": cartBounce,
          })}
        >
          <ShoppingCart className="w-5 h-5 text-green-700" />
          <span className="sr-only">Cart</span>

          {cartNotEmpty && (
            <>
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
              <span className="absolute -top-2 -right-3 bg-green-700 text-white text-[10px] rounded-full px-1.5 font-semibold">
                {cartCount}
              </span>
            </>
          )}
        </button>

        {/* Login/Profile */}
        {user ? (
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-green-700" />
            <button onClick={handleLogout} className="text-xs text-red-500 hover:underline">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        )}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-green-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-t md:hidden p-4 z-40 shadow-md">
          <div className="flex flex-col space-y-4 text-sm">
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
            <button onClick={() => { toggleDrawer(); setMenuOpen(false); }} className="flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" /> Cart
              {cartNotEmpty && (
                <span className="ml-1 text-xs bg-green-700 text-white px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {user.username}
                </div>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-500 text-sm">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-green-700">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
