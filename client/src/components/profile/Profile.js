import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileGames from "./ProfileGames";
/**
 * This component controls the users profile page
 */
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  match,
  auth,
}) => {
  useEffect(() => {
    // get the Id from the url
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}

          <div>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile}></ProfileAbout>
            <div className="profile-exp bg-white">
              <h2 class="text-primary">Favourite Games</h2>
              {profile.games.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="hide-sm">Game</th>
                      <th className="hide-sm">Type</th>{" "}
                      <th className="hide-sm">Year of release</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.games.map((game) => (
                      <ProfileGames key={game._id} game={game}></ProfileGames>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h4>No games added</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
