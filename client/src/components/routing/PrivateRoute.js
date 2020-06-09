import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/**
 * This component handles the private routes, which means the user has to be logged in to view them,
 * if they are not then we redirect them to the login page
 */

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  /*
  ...rest means we take anything else passed in
  */
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      // Check to see if the user is not authenticated
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
