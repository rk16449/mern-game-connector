// fetch all data using an action
// bring it in using a redux state
// and then pass it into other components

import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardOptions from "./DashboardOptions";
import Games from "./Games";
import { deleteAccount } from "../../actions/profile";

/**
 * This component controls the Dashboard page which edits the users Profile.
 *
 * The profile object is retrieved from the redux state, after we call getCurrentProfile()
 * when this component loads to populate it. We then pass any profile data into the
 * dashboards child states.
 *
 * Usage:
 * ```html
 * <Dashboard />
 * ```
 */
const Dashboard = ({
  /**
   * Action method to get the logged in users profile data.
   */
  getCurrentProfile,
  /**
   * Auth object to check whether we are logged in
   */
  auth: { user },
  /**
   * Current logged in Profile object
   */
  profile: { profile, loading },
  /**
   * Action method to delete the account
   */
  deleteAccount,
}) => {
  // Run this once
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile == null ? (
    // Profile is null and is still loading, then show the spinner
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardOptions></DashboardOptions>
          <Games games={profile.games}></Games>
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
