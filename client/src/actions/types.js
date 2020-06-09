// centralised file of all action types
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const GET_PROFILE = "GET_PROFILE";
export const GET_ALL_PROFILES = "GET_ALL_PROFILES";
export const PROFILE_ERROR = "PROFILE_ERROR";
export const CLEAR_PROFILE = "CLEAR_PROFILE"; // Used on logout

export const ACCOUNT_DELETED = "ACCOUNT_DELETED";

export const GET_REPOS = "GET_REPOS";

// posts functions
export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const POST_ERROR = "POST_ERROR";

export const UPDATE_LIKES = "UPDATE_LIKES";

export const DELETE_POST = "DELETE_POST";
export const ADD_POST = "ADD_POST";

export const ADD_COMMENT = "ADD_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";

export const GET_GAMES = "GET_GAMES";

export const GET_GAME = "GET_GAME";
export const GAME_ERROR = "GAME_ERROR";
export const CLEAR_GAME = "CLEAR_GAME";

// Anything to do with builds page
export const ADD_CPU = "ADD_CPU",
  REMOVE_CPU = "REMOVE_CPU",
  LOAD_BUILD = "LOAD_BUILD",
  ADD_CPU_COOLER = "ADD_CPU_COOLER",
  REMOVE_CPU_COOLER = "REMOVE_CPU_COOLER",
  ADD_MOTHERBOARD = "ADD_MOTHERBOARD",
  REMOVE_MOTHERBOARD = "REMOVE_MOTHERBOARD",
  ERROR_BUILD = "ERROR_BUILD",
  LOAD_INITIAL_BUILDS = "LOAD_INITIAL_BUILDS",
  LOAD_INITIAL_CPUS = "LOAD_INITIAL_CPUS",
  LOAD_INITIAL_CPU_COOLERS = "LOAD_INITIAL_CPU_COOLERS",
  GET_LOAD_BUILDS = "GET_LOAD_BUILDS";

// Anything to do with the shopping cart
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  ADD_TO_CART = "ADD_TO_CART";

// Anything to do with products
export const GET_PRODUCTS = "GET_PRODUCTS",
  PRODUCTS_ERROR = "PRODUCTS_ERROR";
