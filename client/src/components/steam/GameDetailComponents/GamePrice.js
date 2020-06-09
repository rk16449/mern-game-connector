import React, { Fragment } from "react";
import PropTypes from "prop-types";

/**
 * This component controls the individual game price in the game page
 */
const GamePrice = ({ data: { price_overview } }) => {
  return (
    <Fragment>
      {price_overview ? (
        <div>Price: {price_overview.final_formatted}</div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

GamePrice.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GamePrice;
