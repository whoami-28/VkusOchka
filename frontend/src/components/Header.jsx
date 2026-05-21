import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { getItemsCount } = useCart();
  const itemsCount = getItemsCount();

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
          <button className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link to="/profile/history" className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant block">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDIHj9vZQpeSaoOFWnQN18LytqeJWsx5fphPB_4_qE9eS7Yr2-1gwJmltB9gDBRiJfvkl58dGQq3S3L4xR_YurdgfpXwgwxIVu7MrEoWAlUCmO4K46vujBYu6MmUpP0oOXq2zoqJubVgSYPh5JpAtPSPvy2jnLsuFJddE98lzS-GPReSITRcW0tRmkBLt9PtiFkEynLgNZu66jbFMoKJO9DHf6nv9o5kUW0cPcyAbtX0WOIJ6laorj0N0mOHXlLCMOxOujYDxb7-c" alt="Пользователь" className="w-full h-full object-cover" />
          </Link>
        </div>
      </div>
    </header>
  );
}