import React, { Fragment } from "react";
/**
 * This component controls any pages or routes on my website that do not exist, instead of sending the user to a blank page, show them this.
 */
export default function NotFound() {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i> Page not found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
    </Fragment>
  );
}
