import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * This component calculates all the build pages parts and returns a total
 *
 * Usage:
 * ```html
 * <BuildTotalCost />
 * ```
 */
const BuildTotalCost = ({ builds: { cpu, cpu_cooler } }) => {
  const calculateCost = () => {
    return +cpu.selected.price + +cpu_cooler.selected.price;
  };

  return <div className="rightCost">Total cost is: £{calculateCost()}</div>;
};

BuildTotalCost.propTypes = {
  builds: PropTypes.object.isRequired,
  totalCost: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  builds: state.builds,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BuildTotalCost);
