import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../components/layout/Spinner";
import { removeBuildComponent } from "../../actions/builds";
import { Link } from "react-router-dom";

const BuildItem = ({
  removeBuildComponent,
  loading,
  build: { name, currency, price, website, url, image_url },
  componentName,
  componentLink,
}) => {
  const handleClick = () => {
    window.location.assign(url);
  };

  return loading ? (
    <Spinner />
  ) : (
    // Load

    <tr>
      <td>
        <Link to={componentLink}>{componentName}</Link>
      </td>
      <td>
        {name ? (
          <div>
            <td width="30%">
              <img src={image_url} border="3" height="90" width="10%"></img>
            </td>
            <td width="70%">
              <p>{name}</p>
            </td>
          </div>
        ) : (
          <Link class="btn btn-dark my-0.5" to={componentLink}>
            Add Component
          </Link>
        )}
      </td>
      <td>
        {currency}
        {price}
      </td>
      <td>{website}</td>
      <td>
        {name ? (
          <button
            type="button"
            className="btn btn-success"
            onClick={handleClick.bind(this)}
          >
            Buy
          </button>
        ) : (
          <></>
        )}
      </td>
      <td>
        {name ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              removeBuildComponent(componentName);
            }}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};

BuildItem.propTypes = {
  removeBuildComponent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { removeBuildComponent })(BuildItem);
