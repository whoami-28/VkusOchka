import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import RestaurantMenu from './pages/RestaurantMenu';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="restaurant/:id" element={<RestaurantMenu />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile/*" element={<Profile />} />
        </Route>
        
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ВРЕМЕННОЕ МЕНЮ ДЛЯ РАЗРАБОТКИ (потом удалишь) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white p-2 rounded-t-xl z-[9999] flex gap-4 text-xs font-mono">
        <a href="/">Home</a>
        <a href="/restaurant/1">Restaurant</a>
        <a href="/product/1">Product</a>
        <a href="/cart">Cart</a>
        <a href="/checkout">Checkout</a>
        <a href="/profile/history">Profile</a>
        <a href="/auth">Auth</a>
      </div>
    </BrowserRouter>
  );
}

export default App;