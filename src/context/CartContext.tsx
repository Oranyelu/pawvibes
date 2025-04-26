import {
  createContext,
  useReducer,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "react-toastify"; // Ensure this import is correct
import "react-toastify/dist/ReactToastify.css";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type CartItem = Product & { quantity: number };

type CartState = {
  cart: CartItem[];
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  cart: [],
};

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  handleAddToCart: (product: Product) => void;
}>({
  state: initialState,
  dispatch: () => null,
  isDrawerOpen: false,
  toggleDrawer: () => {},
  closeDrawer: () => {},
  handleAddToCart: () => {}, // Initial value for the method
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  // ADD TO CART FUNCTION
  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
    });    
  };

  // Persist cart to local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch({ type: "CLEAR_CART" });
      const parsedCart = JSON.parse(savedCart);
      parsedCart.forEach((item: CartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item });
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        isDrawerOpen,
        toggleDrawer,
        closeDrawer,
        handleAddToCart, // Pass down the function here
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
