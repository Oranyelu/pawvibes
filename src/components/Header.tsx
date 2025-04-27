// components/Header.tsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import PawVibeLogo from "../assets/PawVibeHeaderLogo.svg"

const Header = () => {
  const { toggleDrawer, state } = useCart();
  const cartNotEmpty = state.cart.length > 0;

  

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="">
        <img src={PawVibeLogo} alt="PawVibe Header Logo" className="w-[100px]" />
      </Link>

      <nav className="space-x-4 flex items-center">
        <Link to="/shop">Shop</Link>

        <button onClick={toggleDrawer} className="relative">
          <ShoppingCart className="inline-block w-5 h-5" />
          <span className="sr-only">Cart</span>

          {/* Notification dot */}
          {cartNotEmpty && (
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-ping" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
