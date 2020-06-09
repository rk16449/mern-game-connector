import React from "react";
import spinner from "./spinner.gif";

/**
 * This component shows the Loading state of my website, it is purely a GIF to show the user while things such as redux state are loading in the background.
 *
 * Usage:
 * ```html
 * loading ? <Spinner/> : ( Show the rest of the page here )
 * ```
 */
const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;
