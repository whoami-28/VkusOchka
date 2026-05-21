import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('vkusochka_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('vkusochka_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, note = '') => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.note === note);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.note === note
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity, note }];
    });
  };

  const removeFromCart = (productId, note = '') => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === productId && item.note === note)));
  };

  const updateQuantity = (productId, quantity, note = '') => {
    if (quantity <= 0) {
      removeFromCart(productId, note);
      return;
    }
    setCartItems(prevItems => prevItems.map(item =>
      item.id === productId && item.note === note
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}