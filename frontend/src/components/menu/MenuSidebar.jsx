import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function FloatingCartBar() {
  const { getItemsCount, getCartTotal } = useCart();
  const itemsCount = getItemsCount();
  const total = getCartTotal();

  if (itemsCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-primary-container text-on-primary-container px-6 py-4 rounded-3xl shadow-xl z-50 flex justify-between items-center animate-fade-in border border-primary/20">
      <div className="flex flex-col">
        <span className="font-label-md font-bold text-[16px]">{itemsCount} блюд(а) в корзине</span>
        <span className="font-h2 text-[20px]">${total.toFixed(2)}</span>
      </div>
      <Link to="/cart" className="bg-background text-on-surface px-6 py-3 rounded-xl font-label-md hover:scale-105 transition-transform shadow-md flex items-center gap-2">
        Оформить
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </Link>
    </div>
  );
}