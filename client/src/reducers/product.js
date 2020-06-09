import { GET_PRODUCTS, PRODUCTS_ERROR } from "../actions/types";

const initialState = {
  products: [],
  loading: true,
  error: [],
};

const product = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default product;
