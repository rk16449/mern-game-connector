import axios from "axios";
import { setAlert } from "./alert";
import { GET_GAMES, GET_GAME, GAME_ERROR, CLEAR_GAME } from "./types";

// Action to get all profiles
export const getGames = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get("/api/game", config); // this route returns the profile data

    console.log("Games found...");
    console.log(JSON.stringify(res));

    dispatch({ type: GET_GAMES, payload: res.data }); // send the profile data back
  } catch (err) {
    console.log(err.message);

    // Otherwise send a game error
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get game by ID
export const getGameByAppId = (appid) => async (dispatch) => {
  //dispatch({ type: CLEAR_GAME });

  console.log("Game we are trying to load is of app id: " + appid);

  try {
    const res = await axios.get(`/api/game/${appid}`); // this route returns the profile data

    console.log("res is eequal to: " + JSON.stringify(res.data));

    dispatch({ type: GET_GAME, payload: res.data }); // send the profile data back
  } catch (err) {
    console.log(err.message);

    // Otherwise send a game error
    dispatch({
      type: GAME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
