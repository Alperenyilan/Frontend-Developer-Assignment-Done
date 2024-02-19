import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const fetchFromLocalStorage = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  if (cart !== null) {
    return JSON.parse(cart) as CartItem[];
  } else {
    return [];
  }
};
const storeInLocalStorage = (data: CartItem[]): void => {
  localStorage.setItem("cart", JSON.stringify(data));
};

interface CartItem {
  id: number;
  quantity: number;
  price: number;
  discountedPrice: number;
  stock: number;
  totalPrice?: number;
}

interface CartState {
  carts: CartItem[];
  itemsCount: number;
  totalAmount: number;
  isCartMessageOn: boolean;
}

const initialState: CartState = {
  carts: fetchFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const isItemInCart = state.carts.find(
        (item) => item.id === action.payload.id
      );

      if (isItemInCart) {
        const tempCart = state.carts.map((item) => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty * item.price;

            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          } else {
            return item;
          }
        });

        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const tempCart = state.carts.filter((item) => item.id !== action.payload);
      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },

    clearCart: (state) => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },

    getCartTotal: (state) => {
      state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice || 0);
      }, 0);

      state.itemsCount = state.carts.length;
    },

    toggleCartQty: (
      state,
      action: PayloadAction<{ id: number; type: "INC" | "DEC" }>
    ) => {
      const tempCart = state.carts.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrice || 0;

          if (action.payload.type === "INC") {
            tempQty++;
            if (tempQty === item.stock) tempQty = item.stock;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });

      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },

    setCartMessageOn: (state) => {
      state.isCartMessageOn = true;
    },

    setCartMessageOff: (state) => {
      state.isCartMessageOn = false;
    },
  },
});

export const {
  addToCart,
  setCartMessageOff,
  setCartMessageOn,
  getCartTotal,
  toggleCartQty,
  clearCart,
  removeFromCart,
} = cartSlice.actions;
export const getAllCarts = (state: { cart: CartState }) => state.cart.carts;
export const getCartItemsCount = (state: { cart: CartState }) =>
  state.cart.itemsCount;
export const getCartMessageStatus = (state: { cart: CartState }) =>
  state.cart.isCartMessageOn;

export default cartSlice.reducer;
