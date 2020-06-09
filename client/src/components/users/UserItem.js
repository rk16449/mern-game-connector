import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * This component handles the view for each user on the user page
 */
const UserItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{status}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} clasName="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-dragon"> {skill}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

UserItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default UserItem;
