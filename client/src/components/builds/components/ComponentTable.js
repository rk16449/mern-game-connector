import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ComponentItem from "./ComponentItem";

/**
 * This component is a generic table for the components on the build page
 *
 */
const ComponentTable = ({
  type,
  headers,
  headers_component_list,
  component_list,
}) => {
  return (
    <table className="table">
      <tr>
        {headers.map((header) => (
          <th>{header}</th>
        ))}
      </tr>
      {component_list.map((component) => (
        <ComponentItem
          type={type}
          headers_component_list={headers_component_list}
          component={component}
        />
      ))}
    </table>
  );
};

ComponentTable.propTypes = {
  prop: PropTypes,
  headers: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentTable);
