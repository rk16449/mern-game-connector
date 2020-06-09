import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
/**
 * This component is no longer used
 */
export class Shop extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return <div>Not published to live!</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
