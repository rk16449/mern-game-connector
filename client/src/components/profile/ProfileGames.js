import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
/**
 * This component controls the games in the users page
 */
const ProfileGames = ({ game: { _id, name, type, year, notes } }) => (
  <tr key={_id}>
    <td>{name}</td>
    <td className="hide-sm">{type}</td>
    <td>{year && <Moment format="YYYY/MM/DD">{year}</Moment>}</td>
  </tr>
);

ProfileGames.propTypes = {
  game: PropTypes.array.isRequired,
};

export default ProfileGames;
