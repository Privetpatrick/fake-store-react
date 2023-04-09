import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const existingCartItem = cartItems.find(
      (item) => item.id === productToAdd.id
    );
    if (existingCartItem) {
      const newCartItems = cartItems.map((item) =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const existingCartItem = cartItems.find(
      (item) => item.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1) {
      const newCartItems = cartItems.filter(
        (item) => item.id !== cartItemToRemove.id
      );
      setCartItems(newCartItems);
    } else {
      const newCartItems = cartItems.map((item) =>
        item.id === cartItemToRemove.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartItems(newCartItems);
    }
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = cartItems.filter(
      (item) => item.id !== cartItemToClear.id
    );
    setCartItems(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
