import React, { useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import CreateProfile from "../profile-forms/CreateProfile";
import Users from "../users/Users";
import Profile from "../profile/Profile";
import SteamGame from "../steam/GamesDetail";
import EditProfile from "../profile-forms/EditProfile";
import AddGames from "../profile-forms/AddGames";
import Posts from "..//posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";
import Builds from "../builds/Builds";
import ComponentPage from "../builds/components/ComponentPage";
import Shop from "../shop/Shop";
import { connect } from "react-redux";
import { getCpus, getCpuCoolers } from "../../actions/builds";
import PropTypes from "prop-types";
import PostForm from "../posts/PostForm";
import ProductList from "../product/ProductList";
import Cart from "../cart/Cart";

/**
 * This component handles all the routes you can visit in my website for example /my-cart goes to the cart component page
 */
const Routes = ({ getCpus, getCpuCoolers, builds, loading }) => {
  useEffect(() => {
    getCpus();
    getCpuCoolers();
  }, [getCpus, getCpuCoolers]);

  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route path="/my-cart" component={Cart} />

        {/* Build Routes */}
        <Route exact path="/builds" component={Builds}></Route>

        <Route
          exact
          path="/component/cpu"
          render={(props) => <ComponentPage builds={builds.cpu} type="CPU" />}
        ></Route>

        <Route
          exact
          path="/component/cpu-cooler"
          render={(props) => (
            <ComponentPage builds={builds.cpu_cooler} type="CPU_COOLER" />
          )}
        ></Route>

        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/profiles" component={Users}></Route>
        <Route exact path="/profile/:id" component={Profile}></Route>

        <Route exact path="/game/:id" component={SteamGame}></Route>
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/create-profile"
          component={CreateProfile}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/edit-profile"
          component={EditProfile}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/add-games"
          component={AddGames}
        ></PrivateRoute>
        <PrivateRoute exact path="/forums" component={Posts}></PrivateRoute>
        <PrivateRoute
          exact
          path="/add-post"
          component={PostForm}
        ></PrivateRoute>

        <PrivateRoute exact path="/forums/:id" component={Post}></PrivateRoute>
        <Route component={NotFound}></Route>
      </Switch>
    </section>
  );
};

Routes.propTypes = {
  getCpus: PropTypes.func.isRequired,
  getCpuCoolers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  builds: state.builds,
});

export default connect(mapStateToProps, { getCpus, getCpuCoolers })(Routes);
