// takes minimum specs data

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * This component displays the minimum and recommended requirements of the PC game passed into it
 */
export const PCRequirements = ({ data: { pc_requirements } }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: pc_requirements.minimum }}></div>
      <br />
      <div
        dangerouslySetInnerHTML={{ __html: pc_requirements.recommended }}
      ></div>
    </div>
  );
};

PCRequirements.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default PCRequirements;
