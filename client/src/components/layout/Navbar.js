import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

/**
 * This component controls the Navigational Bar located on the top of my website
 *
 * It checks whether or not the user is logged in or not, depending on it, render a different navbar
 * Todo this it pulls the auth object from the redux state, and checked if we are authenticated,
 * if we are then show logout otherwise login
 *
 * The navbar also updates the car link with the amount stored in the cart.
 *
 * Usage:
 * ```html
 * <Navbar/>
 * ```
 */
export const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  cartUpdated,
  cart,
}) => {
  useEffect(() => {
    cartUpdated();
  });

  let total = 0;
  cart.map((item) => (total += item.product.price * item.quantity));

  const authLinks = (
    <ul>
      <li>
        <Link to="/games">
          <i className="fas fa-dragon"></i>Games
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fas fa-user-friends"></i>Users
        </Link>
      </li>
      <li>
        <a href="/builds">
          <i className="fas fa-wrench"></i>Builds
        </a>
      </li>
      <li>
        <Link to="/forums">
          <i className="fas fa-comment"></i>Forums
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          {" "}
          <i className="fas fa-user"></i> Profile
        </Link>
      </li>
      <li>
        <a href="/shop">
          <i className="fas fa-shopping-cart"></i>Shop
        </a>
      </li>
      <li>
        <Link to="/my-cart">
          {cart.length > 0 ? (
            <span className="label label-info">
              {cart.length} items: (${total.toFixed(2)})
            </span>
          ) : null}
          <i className="glyphicon glyphicon-shopping-cart"></i> Cart
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/games">
          <i className="fas fa-dragon"></i>Games
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fas fa-user-friends"></i>Users
        </Link>
      </li>
      <li>
        <a href="/builds">
          <i className="fas fa-wrench"></i>Builds
        </a>
      </li>
      <li>
        <a href="/shop">
          <i className="fas fa-shopping-cart"></i>Shop
        </a>
      </li>
      <li>
        <Link to="/my-cart">
          {cart.length > 0 ? (
            <span className="label label-info">
              {cart.length} items: (£{total.toFixed(2)})
            </span>
          ) : null}
          <i className="glyphicon glyphicon-shopping-cart"></i> Cart
        </Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-purple">
      <h1>
        <Link to="/">
          <i className="fas fa-dragon"></i>GameConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment> {isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart.cart,
  cartUpdated: () => {
    return true;
  },
});

export default connect(mapStateToProps, { logout })(Navbar);
