import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.scss';

const stripePromise = loadStripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    getCheckout({
      variables: { 
        products: [...state.cart],
      },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;









// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { QUERY_CHECKOUT, QUERY_PRODUCTS } from "../../utils/queries";
// import { useLazyQuery, useQuery } from "@apollo/react-hooks";
// import { ADD_TO_CART } from "../../utils/actions";

// function Cart() {
//   const state = useSelector((state) => state);
//   const dispatch = useDispatch();

//   const { data } = useQuery(QUERY_PRODUCTS);

//   // const [getCheckout, { checkoutData }] = useLazyQuery(QUERY_CHECKOUT);
//   // console.log(data);

//   // useEffect(() => {
//   //   console.log("working");
//   // }, [checkoutData]);

//   const addToCart = () => {
//     dispatch({
//       type: ADD_TO_CART,
//       product: data,
//     });
//   };

//   // const checkout = () => {
//   //   const productIds = [];

//   //   state.cart[0].products.forEach((item) => {
//   //     productIds.push(item.id);
//   //   });
//   //   console.log(productIds);
//   //   console.log(data);

//   //   // getCheckout({
//   //   //   variables: { products: ["614a6da4d473c64e7385683e"] },
//   //   // });

//   //   console.log(checkoutData);
//   //   // stripePromise.then((res) => {
//   //   //   res.redirectToCheckout({ sessionId: checkoutData.checkout.session });
//   //   // });
//   // };

//   return (
//     <div>
//       <h1>Testing</h1>
//       <button onClick={addToCart}>Add to cart</button>
//       {/* <button onClick={checkout}>Checkout</button> */}
//     </div>
//   );
// }

// export default Cart;
