import { GET_GAMES, GET_GAME, GAME_ERROR, CLEAR_GAME } from "../actions//types";

const initialState = {
  games: [],
  game: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        loading: false,
      };
    case GET_GAME:
      return {
        ...state,
        game: payload,
        loading: false,
      };
    case GAME_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_GAME:
      return {
        ...state,
        game: null,
        games: [],
        loading: false,
      };
    default:
      return state;
  }
}
