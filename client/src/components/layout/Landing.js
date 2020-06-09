import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * This component controls the Landing page of my website
 *
 * It checks whether or not the user is logged in, and depending on it, displays the buttons to either sign up or login
 * Otherwise it is a blank page with a background.
 *
 * Usage:
 * ```html
 * <Landing/>
 * ```
 */
export const Landing = ({ isAuthenticated }) => {
  const showIfNotLogged = (
    <div>
      <Link to="/register" class="btn btn-primary">
        Sign Up
      </Link>
      <Link to="/login" class="btn btn-light">
        Login
      </Link>
    </div>
  );

  return (
    <section class="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 class="x-large">Gaming Connector</h1>
          <p class="lead">
            Create a gaming profile/hardware portfolio, share posts and get help
            from other gamers, use our chat bot for ease of use!
          </p>
          <div class="buttons"></div>
          {!isAuthenticated ? showIfNotLogged : null}
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
