// src/reducers/cartReducer.ts

type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  
  type CartState = {
    cart: CartItem[];
  };
  
  type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: string } // payload is item id
    | { type: 'CLEAR_CART' };
  
  const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const productToAdd = action.payload;
        const productIndex = state.cart.findIndex(item => item.id === productToAdd.id);
  
        // If product is already in the cart, increase quantity
        if (productIndex >= 0) {
          const updatedCart = [...state.cart];
          updatedCart[productIndex].quantity += 1;
          return { ...state, cart: updatedCart };
        } else {
          // If it's not in the cart, add it
          return { ...state, cart: [...state.cart, { ...productToAdd, quantity: 1 }] };
        }
  
      case 'REMOVE_FROM_CART':
        return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
  
      case 'CLEAR_CART':
        return { ...state, cart: [] };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  