import axios from "axios";
import { setAlert } from "./alert";

// Add a like
import {
  LOAD_INITIAL_CPUS,
  LOAD_INITIAL_CPU_COOLERS,
  ERROR_BUILD,
  REMOVE_CPU,
  ADD_CPU,
  ADD_CPU_COOLER,
  REMOVE_CPU_COOLER,
  ADD_MOTHERBOARD,
  REMOVE_MOTHERBOARD,
  GET_LOAD_BUILDS,
  LOAD_BUILD,
} from "./types";

export const loadBuilds = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/components");
    dispatch({ type: GET_LOAD_BUILDS, payload: res.data });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: ERROR_BUILD,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const loadBuild = (name) => async (dispatch) => {
  console.log("The user wanted to load" + name + " file.");

  try {
    const res = await axios.get(`/api/components/load/${name}`);

    dispatch({
      type: LOAD_BUILD,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const saveBuild = (save_name, builds) => async (dispatch) => {
  console.log("save name is: " + save_name);
  console.log("build.cpu.selected is: " + JSON.stringify(builds.cpu.selected));

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // very bad neeeds to be reworked...
  builds.cpu.selected = { ...builds.cpu.selected, type: "cpu" };
  builds.cpu_cooler.selected = {
    ...builds.cpu_cooler.selected,
    type: "cpu_cooler",
  };

  // save cpu details - rework the data so that we can just loop either a header or objects
  const components = [builds.cpu.selected, builds.cpu_cooler.selected];

  // convert the builds into a components array
  const saveableBuilds = {
    save_name,
    components,
  };

  try {
    const res = await axios.post("/api/components", saveableBuilds, config);
    const exists = res.data === "updated";

    dispatch(
      setAlert(
        exists ? "Build updated" : "Build saved",
        exists ? "primary" : "success"
      )
    );
  } catch (err) {
    console.log(err.message);
    dispatch(setAlert("Add all components to save", "danger"));
  }

  console.log(JSON.stringify(saveableBuilds));
};

export const getCpus = () => async (dispatch) => {
  console.log("get builds was called in action...");

  const res = await axios.get("/api/components/cpu");

  try {
    dispatch({
      type: LOAD_INITIAL_CPUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_BUILD,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCpuCoolers = () => async (dispatch) => {
  const res = await axios.get("/api/components/cpu_cooler");

  try {
    dispatch({
      type: LOAD_INITIAL_CPU_COOLERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_BUILD,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addBuildComponent = (componentName, componentData) => async (
  dispatch
) => {
  console.log("Add the component: " + componentName);
  console.log("Compnent data is: " + JSON.stringify(componentData));

  try {
    switch (componentName) {
      case "CPU":
        dispatch({
          type: ADD_CPU,
          payload: componentData,
        });
        break;
      case "CPU_COOLER":
        dispatch({
          type: ADD_CPU_COOLER,
          payload: componentData,
        });
        break;
      case "MOTHERBOARD":
        dispatch({
          type: ADD_MOTHERBOARD,
          payload: componentData,
        });
        break;
    }
  } catch (err) {
    dispatch({
      type: ERROR_BUILD,
      payload: { msg: err.message },
    });
  }
};

export const removeBuildComponent = (componentName) => async (dispatch) => {
  console.log("REMOVE CPU WAS CALLED with component: " + componentName);

  try {
    switch (componentName) {
      case "CPU":
        dispatch({
          type: REMOVE_CPU,
          payload: null,
        });
        break;
      case "CPU Cooler":
        dispatch({
          type: REMOVE_CPU_COOLER,
          payload: null,
        });
        break;
      case "Motherboard":
        dispatch({
          type: REMOVE_MOTHERBOARD,
          payload: null,
        });
        break;
    }
  } catch (err) {
    dispatch({
      type: ERROR_BUILD,
      payload: { msg: err.message },
    });
  }
};
