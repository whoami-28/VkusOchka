import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import Button from '../ui/Button';
import { useCart } from '../context/CartContext';

function OrderHistoryView() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('vkusochka_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
        <span className="material-symbols-outlined text-[48px] text-tertiary mb-2">history</span>
        <p className="font-body-md text-on-surface-variant">Вы еще не совершали заказов.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map(order => (
        <div key={order.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start border-b border-outline-variant/30 pb-3 mb-3 flex-wrap gap-2">
            <div>
              <h3 className="font-h2 text-[18px] text-on-surface">Заказ #{order.id}</h3>
              <span className="font-label-sm text-tertiary">{order.date}</span>
            </div>
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full">
              {order.status}
            </span>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between font-body-md text-on-surface-variant text-sm">
                <span>{item.name} {item.quantity}x</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border-t border-outline-variant/30 pt-3">
            <span className="font-label-sm text-tertiary truncate max-w-[70%]">Адрес: {order.address}</span>
            <span className="font-h1 text-[18px] text-primary-container">${Number(order.total).toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FavoriteCartsView() {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Пятничный ужин на двоих",
      items: [
        { id: 1, name: "Грибное ризотто с трюфелем", price: 24.00, quantity: 2, image: "" }
      ]
    },
    {
      id: 2,
      name: "Здоровый завтрак",
      items: [
        { id: 6, name: "Боул 'Урожай'", price: 14.95, quantity: 1, image: "" }
      ]
    }
  ]);

  const handleRepeat = (items) => {
    items.forEach(item => addToCart(item, item.quantity, 'Из избранного'));
    alert('Блюда добавлены в корзину!');
  };

  return (
    <div className="flex flex-col gap-4">
      {favorites.map(fav => (
        <div key={fav.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm">
          <div>
            <h3 className="font-h2 text-[18px] text-on-surface mb-1">{fav.name}</h3>
            <p className="font-body-md text-on-surface-variant text-sm">
              {fav.items.map(i => `${i.name} (${i.quantity}шт)`).join(', ')}
            </p>
          </div>
          <Button onClick={() => handleRepeat(fav.items)} className="px-5 py-2 text-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">replay</span> Повторить
          </Button>
        </div>
      ))}
    </div>
  );
}

function SavedCardsView() {
  const [cards, setCards] = useState([
    { id: '1', last4: '4242', brand: 'Visa' },
    { id: '2', last4: '8888', brand: 'Mastercard' }
  ]);

  const handleDelete = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      {cards.map(card => (
        <div key={card.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-tertiary text-[28px]">credit_card</span>
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface">{card.brand} •••• {card.last4}</span>
              <span className="font-label-sm text-tertiary">Основная карта</span>
            </div>
          </div>
          <button onClick={() => handleDelete(card.id)} className="text-on-surface-variant hover:text-error transition-colors p-2">
            <span className="material-symbols-outlined text-[22px]">delete</span>
          </button>
        </div>
      ))}
    </div>
  );
}

function SavedAddressesView() {
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Дом', text: 'Ленинградский проспект, 39с79, кв. 45' },
    { id: 2, type: 'Работа', text: 'ул. Пушкина, д. 10, офис 404' }
  ]);

  const handleDelete = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      {addresses.map(addr => (
        <div key={addr.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-container text-[28px]">
              {addr.type === 'Дом' ? 'home' : 'work'}
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface">{addr.type}</span>
              <span className="font-body-md text-on-surface-variant text-sm">{addr.text}</span>
            </div>
          </div>
          <button onClick={() => handleDelete(addr.id)} className="text-on-surface-variant hover:text-error transition-colors p-2">
            <span className="material-symbols-outlined text-[22px]">delete</span>
          </button>
        </div>
      ))}
    </div>
  );
}

function SettingsView() {
  const [profile, setProfile] = useState({ name: 'Дмитрий', email: 'dimas@vkusochka.ru', phone: '+7 (999) 123-45-67' });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Настройки успешно обновлены!');
  };

  return (
    <form onSubmit={handleSave} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
      <div>
        <label className="font-label-sm text-tertiary mb-1 block">Ваше имя</label>
        <input 
          type="text" 
          value={profile.name} 
          onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
          className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
        />
      </div>
      <div>
        <label className="font-label-sm text-tertiary mb-1 block">Email</label>
        <input 
          type="email" 
          value={profile.email} 
          onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
          className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
        />
      </div>
      <div>
        <label className="font-label-sm text-tertiary mb-1 block">Номер телефона</label>
        <input 
          type="text" 
          value={profile.phone} 
          onChange={e => setProfile(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
        />
      </div>
      <Button type="submit" className="w-fit px-6 mt-2">
        Сохранить изменения
      </Button>
    </form>
  );
}

export default function Profile() {
  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-lg md:py-xl pt-28">
      <div className="flex flex-col md:flex-row gap-lg md:gap-xl">
        <ProfileSidebar />
        
        <div className="w-full md:w-3/4 flex flex-col">
          <Routes>
            <Route path="history" element={<OrderHistoryView />} />
            <Route path="favorites" element={<FavoriteCartsView />} />
            <Route path="cards" element={<SavedCardsView />} />
            <Route path="addresses" element={<SavedAddressesView />} />
            <Route path="settings" element={<SettingsView />} />
            <Route path="*" element={<Navigate to="history" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}