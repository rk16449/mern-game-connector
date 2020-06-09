import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addGame } from "../../actions/profile";
import PropTypes from "prop-types";

export const AddGames = ({ addGame, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    year: "",
    notes: "",
  });

  const { name, type, year, notes } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">Add a game</h1>
      <p class="lead">
        <i class="fas fa-rocket"></i> Add your favourite games here
      </p>
      <small>* = required field</small>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(JSON.stringify(formData));
          addGame(formData, history);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            placeholder="* Game Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Type of game (e.g. FPS)"
            name="type"
            value={type}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <h4>Year of release</h4>
          <input
            type="date"
            name="year"
            value={year}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <textarea
            name="notes"
            cols="30"
            rows="5"
            placeholder="Your custom notes about the game, e.g you like the story"
            value={notes}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddGames.propTypes = {
  addGame: PropTypes.func.isRequired,
};

export default connect(null, { addGame })(withRouter(AddGames));
