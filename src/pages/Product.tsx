import { useParams } from "react-router-dom";
import dummyData from "../data/dummyData.json"; // Ensure correct path
import PetCard from "../components/PetCard"; // Import your existing PetCard component
import { useCart } from "../context/CartContext";
import { useState } from "react";

// Assuming 'Product' type is defined somewhere, like:
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   description?: string;
// }

const Product = () => {
  const { id } = useParams();
  const product = dummyData.find((item) => item.id === id);

  // Type guard to make sure the product is not undefined
  if (!product) {
    return <p>Product not found.</p>;
  }

  const { handleAddToCart } = useCart(); // Assuming this is a valid function from context
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    handleAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // 2 seconds delay
  };

  return (
    <section className="product-page">
      <div className="min-h-[50vh] product-display">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} className="min-h-[300px]" />
        <p>{product.description}</p>
        <p>₦{product.price.toLocaleString()}</p>
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

      {/* Similar Products Section */}
      <div className="pt-9">
        <h3 className="font-bold text-3xl">Similar Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {dummyData
            .filter(
              (item) =>
                item.category === product.category && item.id !== product.id
            )
            .map((similarProduct) => (
              <PetCard key={similarProduct.id} product={similarProduct} />
            ))}
        </div>
      </div>

      {/* More You Might Like Section */}
      <div className="pt-9">
        <h3 className="font-bold text-3xl">More You Might Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {dummyData
            .filter((item) => item.id !== product.id)
            .map((suggestedProduct) => (
              <PetCard key={suggestedProduct.id} product={suggestedProduct} />
            ))}
        </div>
      </div>

      {/* Frequently Bought Together Section */}
      <div className="pt-9">
        <h3 className="font-bold text-3xl">Frequently Bought Together</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          <PetCard key={dummyData[2].id} product={dummyData[2]} />
          <PetCard key={dummyData[3].id} product={dummyData[3]} />
        </div>
      </div>
    </section>
  );
};

export default Product;
