import axios from 'axios';
import { ADD_CART_ITEM, REMOVE_CART_ITEM } from '../constants/cartConstants';

export const addCartItem = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  dispatch({
    type: ADD_CART_ITEM,
    payload: {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity: +quantity,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (productId) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
