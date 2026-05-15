import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-stone-50/95 dark:bg-zinc-950/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-stone-200 dark:border-zinc-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-stone-900 dark:text-stone-50 font-h1">CulinaryCurated</Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/browse" className="text-orange-600 border-b-2 border-orange-600 font-semibold pb-1 px-3 py-2 text-label-md">Каталог</Link>
            <Link to="/profile/history" className="text-stone-600 hover:text-stone-900 transition-all px-3 py-2 text-label-md">Заказы</Link>
            <Link to="/offers" className="text-stone-600 hover:text-stone-900 transition-all px-3 py-2 text-label-md">Акции</Link>
            <Link to="/profile/favorites" className="text-stone-600 hover:text-stone-900 transition-all px-3 py-2 text-label-md">Избранное</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-all">
            <span className="material-symbols-outlined">shopping_cart</span>
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