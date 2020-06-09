import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import ComponentTable from "./ComponentTable";
import { Link } from "react-router-dom";

/**
 * This component is a generic page for the components on the build page
 *
 */
const ComponentPage = ({
  builds: { headers, headers_component_list, component_list },
  loading,
  type,
}) => {
  return loading ? (
    <Spinner />
  ) : (
    // Load
    <Fragment>
      <Link to="/builds">Go back</Link>
      <ComponentTable
        type={type}
        headers={headers}
        headers_component_list={headers_component_list}
        component_list={component_list}
      ></ComponentTable>
    </Fragment>
  );
};

ComponentPage.propTypes = {};

export default connect(null, null)(ComponentPage);
