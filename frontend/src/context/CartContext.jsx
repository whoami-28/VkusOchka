import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('vkusochka_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [promoCode, setPromoCode] = useState(() => localStorage.getItem('vkusochka_promo') || '');
  const [discountPercent, setDiscountPercent] = useState(() => Number(localStorage.getItem('vkusochka_discount')) || 0);

  useEffect(() => {
    localStorage.setItem('vkusochka_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const applyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VKUS20') {
      setPromoCode(cleanCode);
      setDiscountPercent(20);
      localStorage.setItem('vkusochka_promo', cleanCode);
      localStorage.setItem('vkusochka_discount', '20');
      return { success: true, message: 'Скидка 20% применена!' };
    }
    return { success: false, message: 'Неверный или просроченный промокод' };
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountPercent(0);
    localStorage.removeItem('vkusochka_promo');
    localStorage.removeItem('vkusochka_discount');
  };

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

  const clearCart = () => {
    setCartItems([]);
    removePromo();
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      promoCode,
      discountPercent,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemsCount,
      applyPromo,
      removePromo
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}