import React, { Fragment } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import PaypalBtn from "react-paypal-checkout";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

/**
 * This component controls the shopping cart items that have been added
 *
 *
 * Usage:
 * ```html
 * <Cart />
 * ```
 */
const Cart = ({ cart }) => {
  let total = 0;
  cart.map((item) => (total += item.product.price * item.quantity));

  const client = {
    sandbox: "sb-wjcqo1951964@personal.example.com",
    production:
      "AQFRfOMfvLR5T1V0tJulH2ISpgXRXFJzO1kYtdcwDv8Chzcp2FcSiyPomx4tf66NPp40_7YBiQBmRUJL",
  };

  const cartDiv =
    cart.length > 0 ? (
      <div>
        <div className="panel-body">
          <Table>
            <tr>
              <th className="theaderProduct">Product</th>
              <th className="theaderQuantity">Quantity</th>
              <th className="theaderPrice">Price</th>
            </tr>

            {cart.map((item) => {
              return <Item key={item.product.id} item={item} />;
            })}
          </Table>
        </div>

        <hr />
        <div className="panel-footer">
          <div className="row text-center">
            <div className="col-xs-11">
              <h4 className="text-right">
                Total <strong>£{total.toFixed(3)}</strong>
              </h4>
            </div>
          </div>
        </div>
        <br />
        <PaypalBtn client={client} currency={"GBP"} total={total} />
      </div>
    ) : (
      <div className="panel-body">
        <p>Cart is empty</p>
      </div>
    );

  return (
    <Fragment>
      <h1 className="large text-primary">My Shopping Cart</h1>

      <Link to="/shop" className="back-button">
        &lt; back to shop
      </Link>

      {cartDiv}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Cart);
