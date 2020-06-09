// action which will call and load products from the db
import axios from "axios";
import { setAlert } from "./alert";
import { GET_PRODUCTS, PRODUCTS_ERROR } from "./types";

// Action to get all profiles
export const loadProducts = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get("/api/products", config);

    // debugging
    console.log("Products found...");
    console.log(JSON.stringify(res));

    // send this data to the reducer
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {
    console.log(err.message);

    // Otherwise send a game error
    dispatch({
      type: PRODUCTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
