// components/Header.tsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Use the updated hook
import { ShoppingCart } from 'lucide-react';  // Assuming you have lucide installed

const Header = () => {
  const { toggleDrawer } = useCart();  // Now we have the toggleDrawer function

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-pink-600">
        PawVibe
      </Link>
      <nav className="space-x-4 flex items-center">
        <Link to="/shop">Shop</Link>
        <button onClick={toggleDrawer} className="relative">
          <ShoppingCart className="inline-block w-5 h-5" />
          <span className="sr-only">Cart</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
