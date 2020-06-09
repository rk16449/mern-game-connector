import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; // Used to connect redux into a component

/**
 * This component controls the Alerts on the website
 *
 * It is called via the alert action called 'setAlert' found in actions/alert
 *
 * Usage:
 * ```html
 * setAlert('messsage here', 'danger', 3000)
 * ```
 */
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// Mapping the redux state to the props in the component
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
