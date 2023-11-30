import React, { useEffect, useState } from 'react';
import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_PRODUCTS,
  } from '../../utils/actions';
import './style.scss';
import { idbPromise } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';

const Card = ({ product }) => {
    
    const [state, dispatch] = useStoreContext();
    const { cart } = state;
    const addToCart = (id) => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);
        if (itemInCart) {
          dispatch({
            type: UPDATE_CART_QUANTITY,
            _id: id,
            purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
          });
          idbPromise('cart', 'put', {
            ...itemInCart,
            purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
          });
        } else {
          dispatch({
            type: ADD_TO_CART,
            product: { ...product, purchaseQuantity: 1 },
          });
          idbPromise('cart', 'put', { ...product, purchaseQuantity: 1 });
        }
        
      };
    
      const removeFromCart = () => {
        dispatch({
          type: REMOVE_FROM_CART,
          _id: product._id,
        });
    
        idbPromise('cart', 'delete', { ...product });
        
      };

return (
  <div className="container">
      <div className="content">
          <b>Item</b>: {product.name}
          <br/>
          <b>Price</b>: {product.price}
          <br/>
          <b>Seller</b>: {product.seller}
          <br/><br/>
          <div className="card">
              <footer className="card-footer">
              <button onClick={()=>addToCart(product._id)}>Add to Cart</button>
            <button
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
              </footer>
           </div>
             
              
          
      </div>
  </div>
);
};

export default Card;
