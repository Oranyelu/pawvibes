import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; // Import Link to navigate to the product page

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function PetCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all">
      <Link to={`/product/${product.id}`}>  {/* Wrap the entire card with Link */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mb-2">₦{product.price.toLocaleString()}</p>
      </Link>
      <button
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded mt-auto"
      >
        Add to Cart
      </button>
    </div>
  );
}
