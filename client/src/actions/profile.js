import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_ALL_PROFILES,
} from "./types";

// Method to get the current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me"); // this route returns the profile data
    dispatch({ type: GET_PROFILE, payload: res.data }); // send the profile data back
  } catch (err) {
    console.log(err.message);

    // Otherwise send a profile error
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Action to get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/profile"); // this route returns the profile data
    dispatch({ type: GET_ALL_PROFILES, payload: res.data }); // send the profile data back
  } catch (err) {
    console.log(err.message);

    // Otherwise send a profile error
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get(`/api/profile/user/${userId}`); // this route returns the profile data
    dispatch({ type: GET_PROFILE, payload: res.data }); // send the profile data back
  } catch (err) {
    console.log(err.message);

    // Otherwise send a profile error
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    // Sending data requires a config object
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Make the request - this would create a profile with the form data into the database or update it
    const res = await axios.post("/api/profile", formData, config);

    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    // New profile
    if (!edit) {
      history.push("/dashboard"); // redirect to the dashboard
    }
  } catch (err) {
    console.log(err.message);

    const errors = err.response.data.errors;

    // loop through errors - could be that we forgot required fields
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    // Otherwise send a profile error
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Adds a game to the users profile
export const addGame = (formData, history) => async (dispatch) => {
  try {
    // Sending data requires a config object
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Make the request - this would create a profile with the form data into the database or update it
    const res = await axios.put("/api/profile/game", formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert("Game Added", "success"));

    history.push("/dashboard"); // redirect to the dashboard
  } catch (err) {
    console.log(err.message);

    const errors = err.response.data.errors;

    // loop through errors - could be that we forgot required fields
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    // Otherwise send a profile error
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// deletes a users favourite game off profile
export const deleteGame = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/game/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Game Deleted", "success"));
  } catch (err) {
    // Otherwise send a profile error
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete the account and profile
export const deleteAccount = () => async (dispatch) => {
  // Dangerous thing to do so we need a confirm
  if (window.confirm("Are you sure? This is not reversable!")) {
    try {
      await axios.delete("/api/profile/");

      // Clear the logged in profile in the state
      dispatch({
        type: CLEAR_PROFILE,
      });

      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permenantly deleted", "danger"));
    } catch (err) {
      // Otherwise send a profile error
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
