import React from "react";
import { create } from "react-test-renderer";

function App(props) {
  return <App></App>;
}

describe("App component", () => {
  test("Matches the app", () => {
    const app = create(<App />);
    expect(app.toJSON()).toMatchSnapshot();
  });
});
