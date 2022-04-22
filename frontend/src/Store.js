import React, { createContext } from 'react';
//for showing cart items in the cart
export const Store = createContext();
//default cart state
const initialState = {
  cart: {
    cartItems: [],
  },
};
//reducer to handle cart item change
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      //add to cart
      const newItem = action.payload;
      //check if item exists or not
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      //if null it returns newItem. if exists id adds to the cart
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      //update cart value
      return { ...state, cart: { ...state.cart, cartItems } };
    default:
      return state;
  }
}

//export function to handle cart state change in app and product screen
export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
