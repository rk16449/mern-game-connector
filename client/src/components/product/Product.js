import React, { Component, useState } from "react";

/**
 * This component handles the view of the Product in the shop
 */
const Product = ({ product, inCart, addToCart }) => {
  const initialState = {
    inCart2: inCart,
  };

  const [{ inCart2 }, setState] = useState(initialState);

  const addCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setState((prevState) => ({ ...prevState, inCart2: true }));
  };

  return (
    <div className="product-card-container">
      <div className="img-wrap">
        <img className="img-responsive" src={product.image} />
      </div>

      <figcaption className="info-wrap">
        <h4 className="title">{product.title}</h4>
        <p className="desc">{product.description}</p>
      </figcaption>

      <div className="bottom-wrap">
        {inCart2 ? (
          <span className="btn btn-success">Added to cart</span>
        ) : (
          <a
            href="#"
            onClick={addCart}
            className="btn btn-sm btn-primary float-right"
          >
            Add to cart
          </a>
        )}

        <div className="price-wrap h5">
          <span className="price-new">£{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
