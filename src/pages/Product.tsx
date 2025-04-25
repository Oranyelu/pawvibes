import { useParams } from "react-router-dom";
import dummyData from "../data/dummyData.json"; // Ensure correct path

const Product = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const product = dummyData.find((item) => item.id === id); // Find the product by ID

  if (!product) {
    return <p>Product not found.</p>; // Handle the case where no product is found
  }

  const handleAddToCart = () => {
    // Logic to add the product to the cart
    console.log(`${product.name} added to cart!`);
  };

  return (
    <section className="product-page">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      <p>₦{product.price.toLocaleString()}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>

      {/* Similar Products Section */}
      <div className="similar-products">
        <h3>Similar Products</h3>
        <div className="product-list">
          {dummyData
            .filter((item) => item.category === product.category && item.id !== product.id)
            .map((similarProduct) => (
              <div key={similarProduct.id} className="product-card">
                <img src={similarProduct.image} alt={similarProduct.name} />
                <h4>{similarProduct.name}</h4>
                <p>₦{similarProduct.price.toLocaleString()}</p>
              </div>
            ))}
        </div>
      </div>

      {/* More You Might Like Section */}
      <div className="more-you-might-like">
        <h3>More You Might Like</h3>
        <div className="product-list">
          {dummyData
            .filter((item) => item.id !== product.id)
            .map((suggestedProduct) => (
              <div key={suggestedProduct.id} className="product-card">
                <img src={suggestedProduct.image} alt={suggestedProduct.name} />
                <h4>{suggestedProduct.name}</h4>
                <p>₦{suggestedProduct.price.toLocaleString()}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Frequently Bought Together Section */}
      <div className="frequently-bought-together">
        <h3>Frequently Bought Together</h3>
        <div className="product-list">
          {/* Example of suggesting a combination */}
          <div className="product-card">
            <img src={dummyData[2].image} alt={dummyData[2].name} />
            <h4>{dummyData[2].name}</h4>
            <p>₦{dummyData[2].price.toLocaleString()}</p>
          </div>
          <div className="product-card">
            <img src={dummyData[3].image} alt={dummyData[3].name} />
            <h4>{dummyData[3].name}</h4>
            <p>₦{dummyData[3].price.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
