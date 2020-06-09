// function that takes in a piece of state and an action
// an action is going to be dispatched from an action file

import { SET_ALERT, REMOVE_ALERT } from "../actions//types";

// initial state
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
