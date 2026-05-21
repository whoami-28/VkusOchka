import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { getItemsCount } = useCart();
  const navigate = useNavigate();
  const itemsCount = getItemsCount();
  
  const userStr = localStorage.getItem('vkusochka_user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('vkusochka_token');
    localStorage.removeItem('vkusochka_user');
    navigate('/auth');
  };

  return (
    <header className="bg-stone-50/95 dark:bg-zinc-950/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-stone-200 dark:border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-stone-900 dark:text-stone-50 font-h1">Vkusochka</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-all">
            <span className="material-symbols-outlined">shopping_cart</span>
            {itemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile/history" className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold font-h2 border border-outline-variant shadow-sm transition-transform hover:scale-105">
                {user.name.charAt(0).toUpperCase()}
              </Link>
              <button onClick={handleLogout} className="p-2 text-stone-600 hover:bg-red-50 hover:text-red-600 rounded-full transition-all" title="Выйти">
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          ) : (
            <Link to="/auth" className="flex items-center gap-1 font-label-md text-primary-container hover:underline px-2 py-1">
              <span className="material-symbols-outlined text-[20px]">login</span>
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}