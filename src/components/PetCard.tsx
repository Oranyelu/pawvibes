import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function PetCard({ product }: { product: Product }) {
  const { handleAddToCart } = useCart(); // use the function with toast
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    handleAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // 2 seconds delay
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mb-2">₦{product.price.toLocaleString()}</p>
      </Link>
      <button
        onClick={handleClick}
        disabled={added}
        className={`w-full py-2 rounded mt-auto transition-all duration-200 ${
          added
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {added ? "Added to Cart ✅" : "Add to Cart"}
      </button>
    </div>
  );
}
