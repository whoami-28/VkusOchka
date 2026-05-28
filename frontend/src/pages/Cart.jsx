import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { useCart } from '../context/CartContext';
import Button from '../ui/Button';

export default function Cart() {
  const { cartItems, clearCart, getItemsCount } = useCart();
  const [templateName, setTemplateName] = useState('');

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      alert('Введите название для шаблона');
      return;
    }

    const currentFavorites = JSON.parse(localStorage.getItem('vkusochka_favorites') || '[]');
    const newTemplate = {
      id: Date.now(),
      name: templateName.trim(),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        note: item.note || ''
      }))
    };

    localStorage.setItem('vkusochka_favorites', JSON.stringify([newTemplate, ...currentFavorites]));
    alert('Корзина успешно сохранена как шаблон в профиле!');
    setTemplateName('');
  };

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
        <Link to="/browse">
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

          <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="flex-grow w-full">
              <h3 className="font-label-md text-on-surface mb-1">Сохранить этот состав корзины</h3>
              <input 
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Например: Мой любимый обед, Пятничный ужин..."
                className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary-container transition-colors text-sm"
              />
            </div>
            <Button onClick={handleSaveTemplate} className="w-full md:w-auto px-6 py-2.5 self-end text-sm">
              Сохранить как шаблон
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}