import React, { Component, useEffect } from "react";
import Product from "./Product";
import { addToCart } from "../../actions/cartActions";
import { connect } from "react-redux";
import { loadProducts } from "../../actions/product";
import Spinner from "../layout/Spinner";

/**
 * This component handles the list of products in the shop
 */
const ProductList = ({ products, addToCart, cart, loadProducts, loading }) => {
  useEffect(() => {
    // Load the products list by calling the action
    console.log("Load products...");
    loadProducts();
  }, [loadProducts]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="shopcontainer">
      <h2>Product List</h2>
      <br />
      <div className="row">
        {products.map((product) => (
          <Product
            product={product}
            addToCart={addToCart}
            inCart={
              cart.length > 0 &&
              cart.filter((e) => e.product.id === product.id).length > 0
            }
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.product.loading,
    products: state.product.products,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = {
  loadProducts,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
