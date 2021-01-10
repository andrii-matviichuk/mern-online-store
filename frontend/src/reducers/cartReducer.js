import { ADD_CART_ITEM, REMOVE_CART_ITEM } from '../constants/cartConstants';

const initStateCart = {
  cartItems: [],
};

export const cartReducer = (state = initStateCart, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const existItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === existItem.productId
              ? { ...action.payload }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };
    default:
      return { ...state };
  }
};
