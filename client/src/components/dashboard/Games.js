import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment"; // used to format dates
import { deleteGame } from "../../actions/profile";

/**
 * This component controls the Games that the user has added to their favourited games
 * There is also the option to delete the favourite games off their list
 * Usage:
 * ```html
 * <Games games={profile.games}></Games>
 * ```
 */
const Games = ({
  /**
   * prop state data, passed in from the level the component <Games> exists in
   */
  games,
  /**
   * Action method to delete the specific game from the users profile
   */
  deleteGame,
}) => {
  // For each of the games, generate a table row, with the game data and also add a delete Game button,
  // with the deleteGame action method
  const game_rows = games.map((game) => (
    <tr key={game._id}>
      <td>{game.name}</td>
      <td className="hide-sm">{game.type}</td>
      <td>{game.year && <Moment format="YYYY/MM/DD">{game.year}</Moment>}</td>
      <td>
        <button onClick={() => deleteGame(game._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Favourited games</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">Game</th>
            <th className="hide-sm">Type</th>{" "}
            <th className="hide-sm">Year of release</th>
          </tr>
        </thead>
        <tbody>{game_rows}</tbody>
      </table>
    </Fragment>
  );
};

Games.propTypes = {
  games: PropTypes.array.isRequired,
  deleteGame: PropTypes.func.isRequired,
};

export default connect(null, { deleteGame })(Games);
