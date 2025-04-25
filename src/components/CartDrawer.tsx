// components/CartDrawer.tsx
import { useCart } from "../context/CartContext";  // Updated to use the new CartContext
import { X } from "lucide-react";  // Close button icon from lucide-react
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { state, dispatch, isDrawerOpen, closeDrawer } = useCart();  // Now we can access cart data and drawer state

  // Calculate total price and item count
  const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = state.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ).toFixed(2);  // .toFixed(2) for two decimal places

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={closeDrawer}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        {state.cart.length === 0 ? (
          <p>No items yet 😿</p>
        ) : (
          state.cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-3">
              <span>{item.name}</span>
              <span className="text-sm">x{item.quantity}</span>
              <button
                onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary Section */}
      {state.cart.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total Price</span>
            <span>${totalPrice}</span>
          </div>

          <Link
            to="/cart"
            onClick={closeDrawer}
            className="block text-center bg-pink-600 text-white py-2 rounded"
          >
            Go to Cart Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
