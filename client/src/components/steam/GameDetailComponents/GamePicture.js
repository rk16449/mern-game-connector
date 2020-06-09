import React, { Fragment } from "react";
import PropTypes from "prop-types";

/**
 * This component controls the game picture in the game page
 */
const GamePicture = ({ data: { background } }) => {
  return (
    <Fragment>
      <img className="" src={background} alt="" />
    </Fragment>
  );
};

GamePicture.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GamePicture;
