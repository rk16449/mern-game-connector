import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import BuildTable from "./BuildTable";
import BuildSaveModal from "./BuildSaveModal";
import { Container } from "reactstrap";

/**
 * This component controls the Build page, which has multiple child components
 *
 * The child components it communicates with is the BuildTable, and the BuildSaveModal
 *
 * Usage:
 * ```html
 * <Builds />
 * ```
 */
const Builds = ({ loading }) => {
  return loading ? (
    <Spinner />
  ) : (
    // Load
    <Fragment>
      <BuildTable></BuildTable>

      <Container>
        <BuildSaveModal></BuildSaveModal>
      </Container>
    </Fragment>
  );
};

Builds.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Builds);
