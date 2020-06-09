import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null, // used to check for changing the navbar for loggedin users
  loading: true, // making sure that the loading is done
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Token worked, we are now logged in
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // make the user get logged in straight away
      localStorage.setItem("token", payload.token);
      return {
        ...state, // whatevers currently in the state
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACCOUNT_DELETED:
    case LOGOUT:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      // remove anything in local storage
      localStorage.removeItem("token");
      return {
        ...state, // whatevers currently in the state
        token: null,
        isAuthenticated: false,
        loading: false, // it's still done loading
      };
    default:
      return state;
  }
}
