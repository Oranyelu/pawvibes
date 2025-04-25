// pages/Checkout.tsx
import { useCart } from "../context/CartContext"; // Import useCart hook to access cart data
import { Link } from "react-router-dom"; // Import Link for routing to go back to shop

const Checkout = () => {
  const { state, dispatch } = useCart(); // Now, you get both state and dispatch
  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    // Simulate placing the order (this is where you could handle backend API calls)
    alert("Order placed successfully!");

    // Clear the cart
    dispatch({ type: "CLEAR_CART" }); // Use dispatch to clear the cart
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      {state.cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">Items in your cart:</h3>
          <ul className="space-y-4">
            {state.cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-xl font-semibold">
              Total: ${getTotalPrice().toFixed(2)}
            </p>
            <button
              onClick={handlePlaceOrder}
              className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-800"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
      <div className="mt-4">
        <Link to="/shop">
          <button className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-800">
            Back to Shop
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Checkout;
