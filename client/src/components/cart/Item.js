import React, { useState } from "react";
import { connect } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../../actions/cartActions";
import { Button } from "reactstrap";

/**
 * This component controls the individual items in the shopping cart
 *
 *
 * Usage:
 * ```html
 * <Cart>
 *  // For each item in the cart.. render with Item
 *  {cart.map((item) => {
              return <Item key={item.product.id} item={item} />;
    })}
 * </Cart>
 * ```
 */
const Item = ({ item, removeFromCart, updateCartQuantity }) => {
  const initialState = {
    quantity: item.quantity,
    btnVisible: false,
  };

  const [{ quantity, btnVisible }, setState] = useState(initialState);

  const handleChange = (e) => {
    if (e.target.value <= 0) {
      alert("Quantity must be greater than or equal to 1");
      return;
    }

    if (e.target.value > item.product.amount) {
      alert("You have exceeded the available items of this product!");
      return;
    }

    const target = e.target;
    console.log("On name change called");

    if (e.target) {
      if (quantity != target.value) {
        setState((prevState) => ({
          ...prevState,
          quantity: target.value,
          btnVisible: true,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target) {
      updateCartQuantity(item.product.id, quantity);
      setState({
        btnVisible: false,
      });
    }
  };

  const handleRemove = (e) => {
    removeFromCart(item.product.id);
  };

  return (
    <tr key={item.product.id}>
      <td>
        <div className="col-xs-2">
          <img className="img-responsive" src={item.product.image} />
        </div>
        <div className="col-xs-4">
          <h4 className="product-name">
            <strong>{item.product.title}</strong>
          </h4>
        </div>
      </td>

      <td>
        <div className="col-xs-6">
          <div className="col-xs-3 text-right">
            <h6>
              <strong>
                {item.product.price} <span className="text-muted">x</span>
              </strong>
            </h6>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="col-xs-4">
              <input
                type="number"
                className="form-control input-sm"
                onChange={handleChange}
                value={quantity}
              />
            </div>
            {btnVisible ? (
              <div className="col-xs-2">
                <button type="submit" className="btn btn-info">
                  Update
                </button>
              </div>
            ) : null}
            <div className="col-xs-2">
              <Button className="btn btn-danger" onClick={handleRemove}>
                <i class="fa fa-trash" aria-hidden="true"></i> Remove
              </Button>
            </div>
          </form>
        </div>
      </td>

      <td>£{item.product.price}</td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCartQuantity: (productId, quantity) =>
      dispatch(updateCartQuantity(productId, quantity)),
    removeFromCart: (productId) => dispatch(removeFromCart(productId)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
