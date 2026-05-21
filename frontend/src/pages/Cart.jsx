import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { useCart } from '../context/CartContext';
import Button from '../ui/Button';

export default function Cart() {
  const { cartItems, clearCart, getItemsCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-xl flex flex-col items-center justify-center pt-32 text-center min-h-[70vh]">
        <div className="w-40 h-40 mb-6 bg-surface-container rounded-full flex items-center justify-center border border-outline-variant/30 shadow-sm">
          <span className="material-symbols-outlined text-[64px] text-tertiary">shopping_basket</span>
        </div>
        <h1 className="font-h1 text-[32px] text-on-surface mb-4">Ваша корзина пуста</h1>
        <p className="font-body-md text-on-surface-variant mb-8 max-w-md">
          Похоже, вы еще ничего не добавили. Перейдите в каталог, чтобы найти вкусные блюда.
        </p>
        <Link to="/">
          <Button className="px-8 py-3">В каталог</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-lg md:py-xl pt-28">
      <div className="flex items-center gap-xs text-tertiary font-label-md mb-md">
        <Link to="/" className="hover:text-primary">Главная</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-on-surface">Корзина</span>
      </div>

      <div className="flex justify-between items-end mb-lg">
        <h1 className="font-h1 text-[32px] md:text-[40px] text-on-surface leading-none">Корзина</h1>
        <button 
          onClick={clearCart} 
          className="font-label-md text-error hover:underline flex items-center gap-1 mb-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
          Очистить всё
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 md:p-6 mb-6 shadow-sm">
            <h2 className="font-h2 text-h2 text-on-surface mb-4 border-b border-outline-variant/30 pb-4">
              Состав заказа ({getItemsCount()})
            </h2>
            <div className="flex flex-col">
              {cartItems.map((item, index) => (
                <CartItem key={`${item.id}-${item.note}-${index}`} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}