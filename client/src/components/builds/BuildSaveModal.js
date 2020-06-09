import React, { useState, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  ModalBody,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./bootstrap.css";
import { saveBuild, loadBuilds, loadBuild } from "../../actions/builds";

const initialState = {
  modalSave: false,
  modalLoad: false,
  selected: undefined,
  name: "",
  isDebug: true,
};

function clearModal() {
  return new Promise((resolve) => {
    setTimeout(resolve, 250);
  });
}

/**
 * This component controls the saving and loading of the users Builds
 * It loads builds whenever opening and shows them on the drop down menu
 * It also has the ability to load and update the build page with the load button
 * We can also save any build data too
 *
 *
 * Usage:
 * ```html
 * <BuildSaveModal />
 * ```
 */
const BuildSaveModal = ({
  saveBuild,
  loadBuilds,
  loadBuild,
  builds,
  isAuthenticated,
}) => {
  const [
    { modalSave, modalLoad, selected, isDebug, name },
    setState,
  ] = useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  /////////////////////////////////////////////////////
  /** SAVING DATA */
  /////////////////////////////////////////////////////

  const toggleSave = (e) => {
    // Opening save
    if (!modalSave) {
      // Load previous builds to add into the overrite column
      loadBuilds();
    } else {
      // clear the state
      clearModal().then(clearState);
    }

    setState((prevState) => ({ ...prevState, modalSave: !modalSave }));
  };

  const onSubmitSave = (e) => {
    e.preventDefault();
    // call a redux action to save the build
    saveBuild(name, builds);
    // Close the modal
    toggleSave();
  };

  const onChangeName = (e) => {
    e.preventDefault();
    const target = e.target;
    console.log("On name change called");

    if (e.target) {
      setState((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  /////////////////////////////////////////////////////
  /** LOADING DATA */
  /////////////////////////////////////////////////////

  const onSubmitLoad = (e) => {
    e.preventDefault();
    // make sure we selected something first
    if (selected) {
      console.log("selected is equal to: " + selected);

      toggleLoad();

      loadBuild(selected);

      // clear the state
      clearModal().then(clearState);
    }
  };

  const onChangeLoadSelect = (e) => {
    console.log("OnChangeSelect was called");

    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleLoad = (e) => {
    if (!modalLoad) {
      console.log("ModalLoad is being opened...");
      // Load builds on toggle every time since it could change
      loadBuilds();
    } else {
      console.log("ModalLoad is being closed...");

      // clear the state
      clearModal().then(clearState);
    }

    setState((prevState) => ({ ...prevState, modalLoad: !modalLoad }));
  };

  ///////////////////////////////////////////////////////////////////////

  return (
    <Fragment>
      {isAuthenticated ? (
        <Fragment>
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={(e) => toggleLoad()}
          >
            Load Build...
          </Button>

          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={(e) => toggleSave()}
          >
            Save As..
          </Button>
        </Fragment>
      ) : (
        <h4 className="mb-3">Please login to save items...</h4>
      )}

      {isAuthenticated && (
        <Fragment>
          <Modal isOpen={modalSave} toggle={(e) => toggleSave()}>
            <ModalHeader toggle={(e) => toggleSave()}>Save build</ModalHeader>
            <ModalBody>
              <Form onSubmit={(e) => onSubmitSave(e)}>
                <FormGroup>
                  <Label for="item">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Save as..."
                    onChange={(e) => onChangeName(e)}
                    required
                  />
                  <Button color="dark" style={{ marginTop: "2rem" }}>
                    Save
                  </Button>
                </FormGroup>
              </Form>

              {isDebug && (
                <div>
                  <Label>Save Name</Label>
                  <p>{JSON.stringify(name)}</p>
                  <br />
                  <Label for="exampleSelect">Saved files</Label>

                  {builds.load_builds.length > 0 && (
                    <Input type="select" name="selected" id="exampleSelect">
                      {builds.load_builds.map((comp) => (
                        <option>{comp.save_name}</option>
                      ))}
                    </Input>
                  )}
                </div>
              )}
            </ModalBody>
          </Modal>

          <Modal isOpen={modalLoad} toggle={(e) => toggleLoad()}>
            <ModalHeader toggle={(e) => toggleLoad()}>Load build</ModalHeader>
            <ModalBody>
              <Form onSubmit={(e) => onSubmitLoad(e)}>
                <FormGroup>
                  <Label>Saved files</Label>
                  {builds.load_builds.length > 0 && (
                    <Input
                      type="select"
                      name="selected"
                      id="loadSelect"
                      onChange={(e) => onChangeLoadSelect(e)}
                      selected={selected}
                      required
                    >
                      <option>Pick a file to load....</option>
                      {builds.load_builds.map((comp) => (
                        <option name={comp.save_name} value={comp.save_name}>
                          {comp.save_name}
                        </option>
                      ))}
                    </Input>
                  )}
                  <Button
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    disabled={!selected}
                  >
                    Load
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </Fragment>
      )}
    </Fragment>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node,
  // Applied the row class when true, does nothing when false
  row: PropTypes.bool,
  // Applied the form-check class when true, form-group when false
  check: PropTypes.bool,
  inline: PropTypes.bool,
  // Applied the disabled class when the check and disabled props are true, does nothing when false
  disabled: PropTypes.bool,
  // Pass in a Component to override default element
  tag: PropTypes.string, // default: 'div'
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

BuildSaveModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  saveBuild: PropTypes.func.isRequired,
  loadBuilds: PropTypes.func.isRequired,
  builds: PropTypes.object.isRequired,
  loadBuild: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  //item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  builds: state.builds,
});

const mapDispatchToProps = {
  saveBuild,
  loadBuilds,
  loadBuild,
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildSaveModal);
