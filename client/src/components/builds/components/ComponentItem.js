import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBuildComponent } from "../../../actions/builds";
import { Link } from "react-router-dom";

/**
 * This component is a generic item for the components on the build table
 *
 */
const ComponentItem = ({
  type,
  addBuildComponent,
  component,
  headers_component_list,
}) => {
  return (
    <tr>
      {headers_component_list.map((header) => (
        <td>{component[header]}</td>
      ))}
      <td>
        <Link
          to="/builds"
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            addBuildComponent(type, component);
          }}
        >
          Select
        </Link>
      </td>
    </tr>
  );
};

ComponentItem.propTypes = {
  headers_component_list: PropTypes.array.isRequired,
  component: PropTypes.object.isRequired,
  header: PropTypes.string,
  addBuildComponent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addBuildComponent,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentItem);
