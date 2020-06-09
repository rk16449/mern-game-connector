import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions//auth";
import { GoogleLogin } from "react-google-login";
import InstagramLogin from "react-instagram-login";
import FacebookLogin from "react-facebook-login";
import { Container } from "reactstrap";

/**
 * This component controls the Login page for the app
 *
 * It is a form which submits data to the server, and if correct will redirect to the Dashboard
 *
 * Usage:
 * ```html
 * <Login />
 * ```
 */

export const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseInstagram = (response) => {
    console.log(response);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Success");
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 class="large text-primary">Login</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Login Into Your Account
      </p>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>

      {/* <Container>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <InstagramLogin
          clientId="5fd2f11482844c5eba963747a5f34556"
          buttonText="Login"
          onSuccess={responseInstagram}
          onFailure={responseInstagram}
        />
        <FacebookLogin
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </Container>*/}

      <p class="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
