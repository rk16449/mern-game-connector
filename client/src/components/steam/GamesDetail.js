import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGameByAppId } from "../../actions/game";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import GamePrice from "./GameDetailComponents/GamePrice";
import { PCRequirements } from "./GameDetailComponents/PCRequirements";
import GamePicture from "./GameDetailComponents/GamePicture";

/**
 * This component controls the individual Games clicked on in the Games page
 *
 * Usage:
 * ```html
 * <PCRequirements data={game}></PCRequirements>
 * ```
 *
 */
const Games = ({ getGameByAppId, game: { game, loading }, match }) => {
  useEffect(() => {
    // get the Id from the url
    getGameByAppId(match.params.id);
  }, [getGameByAppId]);

  return (
    <Fragment>
      {!game ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/games" className="btn btn-light">
            Back to Games
          </Link>

          {/*
          <Link to="#!" className="btn btn-yellow">
            Favourite
          </Link>
          */}

          <Fragment>
            {game ? (
              <div>
                <h1 className="large text-primary">{game.name}</h1>
                <GamePicture data={game}></GamePicture>

                <p>{game.short_description}</p>
                <GamePrice data={game}></GamePrice>
                <PCRequirements data={game}></PCRequirements>
              </div>
            ) : (
              <div></div>
            )}
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

Games.propTypes = {
  getGameByAppId: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGameByAppId })(Games);
