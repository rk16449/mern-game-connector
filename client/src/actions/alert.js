import uuidv4 from "uuid/v4";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType, timeout = 3000) => (dispatch) => {
  const id = uuidv4();

  // dispatch a SET_ALERT to the reducer
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  // After some time (default of 3 seconds) delete the alert from state
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout
  );
};
