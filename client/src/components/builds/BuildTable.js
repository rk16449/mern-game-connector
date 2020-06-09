import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import { getBuilds, removeCPU } from "../../actions/builds";
import BuildItem from "./BuildItem";
import BuildTotalCost from "./BuildTotalCost";
import { Table } from "reactstrap";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";

/**
 * This component controls the table of the build page, where there is a component, selected and price
 *
 *
 * Usage:
 * ```html
 * <BuildTable />
 * ```
 */
const BuildTable = ({
  builds: { cpu, cpu_cooler },
  loading,
  auth: { isAuthenticated },
}) => {
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Table className="table">
        <tr>
          <th className="theaderComponent">Component</th>
          <th className="theaderSelected">Selected</th>
          <th className="theaderPrice">Price</th>
          <th className="theaderCompany" colspan="3">
            Company
          </th>
        </tr>
        <BuildItem
          componentName={"CPU"}
          componentLink={"/component/cpu"}
          build={cpu.selected}
        ></BuildItem>
        <BuildItem
          componentName={"CPU Cooler"}
          componentLink={"/component/cpu-cooler"}
          build={cpu_cooler.selected}
        ></BuildItem>
      </Table>
      <BuildTotalCost></BuildTotalCost>
    </Fragment>
  );
};

BuildTable.propTypes = {
  builds: PropTypes.object.isRequired,
  getBuilds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  builds: state.builds,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(BuildTable);
