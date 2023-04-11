import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  if (existingCartItem) {
    const newCartItems = cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  } else {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, [
      ...cartItems,
      { ...productToAdd, quantity: 1 },
    ]);
  }
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    const newCartItems = cartItems.filter(
      (item) => item.id !== cartItemToRemove.id
    );
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  } else {
    const newCartItems = cartItems.map((item) =>
      item.id === cartItemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  }
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = cartItems.filter(
    (item) => item.id !== cartItemToClear.id
  );
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
