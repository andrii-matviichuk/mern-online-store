import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

const dispatchError = (dispatch, type, err) => {
  dispatch({
    type,
    payload:
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message,
  });
};

export const getProductList = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/v1/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatchError(dispatch, PRODUCT_LIST_FAIL, err);
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, loading: true });
    const { data } = await axios.get(`/api/v1/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data, loading: false });
  } catch (err) {
    dispatchError(dispatch, PRODUCT_DETAILS_FAIL, err);
  }
};
