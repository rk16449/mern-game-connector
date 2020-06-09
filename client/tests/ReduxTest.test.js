import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import React from "react";
import Navbar from "../../components/layout/Navbar";

describe("Render an authenticated navbar", () => {
  const mockStore = configureMockStore([thunk]);

  const store = mockStore({
    auth: { isAuthenticated: true },
  });

  beforeEach(() => {
    wrapped = mount(
      <Provider store={store}>
        <Navbar></Navbar>
      </Provider>
    );
  });

  it("render correct navbar, there should be 7 elements", () => {
    expect(wrapped.find(Navbar).length).toEqual(7);
  });
});
