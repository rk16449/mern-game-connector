import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./components/routing/Routes";
import { PersistGate } from "redux-persist/lib/integration/react";
import Spinner from "./components/layout/Spinner";
// Redux
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import "./App.css";
import { Chatbot } from "./components/chatbot/Chatbot";
import CookieConsent from "react-cookie-consent";
import Steam from "../src/components/steam/Games";
import ProductList from "../src/components/product/ProductList";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

/**
 * This component is the main entry to the App
 *
 * The entire app is wrapped with redux, which stores the state on the client side
 * to store things such as the logged in users data
 *
 * It sets up the Navbar, the routes, the chatbot and the cookie consent component
 *
 * The first time this component runs, we dispatch to the store to load the current User
 */

const App = () => {
  // use Effect hook, only runs once (like component did mount)
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    /**Wrap entire project with redux store to manage state */
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <Router>
          <Fragment>
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/games" component={Steam}></Route>
              <Route exact path="/shop" component={ProductList}></Route>
              <Route component={Routes} />
            </Switch>
          </Fragment>
          <Chatbot></Chatbot>
        </Router>
        <CookieConsent
          location="top"
          buttonText="Understood"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}>
            We use cookies to store chatbot data and login data
          </span>
        </CookieConsent>
      </PersistGate>
    </Provider>
  );
};

export default App;
