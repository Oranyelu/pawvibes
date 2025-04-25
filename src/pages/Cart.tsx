// pages/Cart.tsx
import { useCart } from "../context/CartContext"; // Import the useCart hook to access cart data
import { Link } from "react-router-dom"; // Import Link for routing to checkout

const Cart = () => {
  const { state, dispatch } = useCart(); // Access cart state and dispatch from CartContext

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id }); // Remove item from cart
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {state.cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
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
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="text-xl font-semibold">
              Total: ${getTotalPrice().toFixed(2)}
            </p>
            <Link to="/checkout">
              <button className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-800">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
