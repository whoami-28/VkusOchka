import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import Button from '../ui/Button';
import { useCart } from '../context/CartContext';

function OrderHistoryView() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('vkusochka_token');
      if (!token) {
        navigate('/auth');
        return;
      }

      try {
        const response = await fetch('http://localhost:5147/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else if (response.status === 401) {
          localStorage.removeItem('vkusochka_token');
          localStorage.removeItem('vkusochka_user');
          navigate('/auth');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleSaveAsTemplate = (order) => {
    const currentFavorites = JSON.parse(localStorage.getItem('vkusochka_favorites') || '[]');
    const newTemplate = {
      id: Date.now(),
      name: `Заказ от ${order.date}`,
      items: order.items.map(i => ({
        id: Math.floor(Math.random() * 1000),
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        note: ''
      }))
    };
    localStorage.setItem('vkusochka_favorites', JSON.stringify([newTemplate, ...currentFavorites]));
    alert('Заказ сохранен в избранные корзины!');
  };

  if (isLoading) return <div className="text-center py-12 text-on-surface-variant font-label-md">Загрузка...</div>;

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
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleSaveAsTemplate(order)}
                className="text-primary-container hover:bg-surface-container p-1.5 rounded-lg transition-colors flex items-center justify-center"
                title="Сохранить как шаблон"
              >
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
              </button>
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full">
                {order.status}
              </span>
            </div>
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

function FavoriteRestaurantsView() {
  const [favs, setFavs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavs(JSON.parse(localStorage.getItem('vkusochka_fav_restaurants') || '[]'));
  }, []);

  const removeFav = (id) => {
    const updated = favs.filter(f => f.id !== id);
    setFavs(updated);
    localStorage.setItem('vkusochka_fav_restaurants', JSON.stringify(updated));
  };

  if (favs.length === 0) {
    return (
      <div className="text-center py-12 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
        <span className="material-symbols-outlined text-[48px] text-tertiary mb-2">storefront</span>
        <p className="font-body-md text-on-surface-variant">Вы пока не добавили ни одного ресторана в избранное.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {favs.map(fav => (
        <div key={fav.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm flex flex-col group">
          <div className="h-32 w-full overflow-hidden relative cursor-pointer" onClick={() => navigate(`/restaurant/${fav.id}`)}>
            <img src={fav.image} alt={fav.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="p-4 flex justify-between items-center">
            <h3 className="font-h2 text-[18px] text-on-surface cursor-pointer hover:text-primary-container transition-colors" onClick={() => navigate(`/restaurant/${fav.id}`)}>{fav.name}</h3>
            <button onClick={() => removeFav(fav.id)} className="text-on-surface-variant hover:text-error transition-colors p-2 flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>heart_broken</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function FavoriteCartsView() {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavs = localStorage.getItem('vkusochka_favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    } else {
      const defaultFavs = [
        {
          id: 1,
          name: "Пятничный ужин на двоих",
          items: [
            { id: 1, name: "Грибное ризотто с трюфелем", price: 24.00, quantity: 2, note: "" }
          ]
        }
      ];
      localStorage.setItem('vkusochka_favorites', JSON.stringify(defaultFavs));
      setFavorites(defaultFavs);
    }
  }, []);

  const handleRepeat = (items) => {
    items.forEach(item => addToCart(item, item.quantity, item.note || ''));
    alert('Блюда добавлены в корзину!');
  };

  const handleDelete = (id) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem('vkusochka_favorites', JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
        <span className="material-symbols-outlined text-[48px] text-tertiary mb-2">auto_awesome_motion</span>
        <p className="font-body-md text-on-surface-variant">У вас нет избранных шаблонов корзин.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {favorites.map(fav => (
        <div key={fav.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm">
          <div className="flex-grow">
            <h3 className="font-h2 text-[18px] text-on-surface mb-1 font-bold">{fav.name}</h3>
            <p className="font-body-md text-on-surface-variant text-sm">
              {fav.items.map(i => `${i.name} (${i.quantity}шт)`).join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button onClick={() => handleDelete(fav.id)} className="text-on-surface-variant hover:text-error transition-colors p-2">
              <span className="material-symbols-outlined text-[22px]">delete</span>
            </button>
            <Button onClick={() => handleRepeat(fav.items)} className="px-5 py-2 text-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">replay</span> Повторить
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SavedCardsView() {
  const [cards, setCards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedCards = localStorage.getItem('vkusochka_cards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    } else {
      const defaultCards = [
        { id: '1', last4: '4242', brand: 'Visa' },
        { id: '2', last4: '8888', brand: 'Mastercard' }
      ];
      localStorage.setItem('vkusochka_cards', JSON.stringify(defaultCards));
      setCards(defaultCards);
    }
  }, []);

  const getCardBrand = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]|^2[2-7]/.test(cleanNumber)) return 'Mastercard';
    if (/^220[0-4]/.test(cleanNumber)) return 'МИР';
    return 'Card';
  };

  const validateLuhn = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (!/^\d+$/.test(cleanNumber)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i));
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateCardForm = () => {
    const newErrors = {};
    const cleanNumber = newCard.number.replace(/\s/g, '');

    if (cleanNumber.length !== 16) {
      newErrors.number = 'Номер карты должен состоять из 16 цифр';
    } else if (!validateLuhn(cleanNumber)) {
      newErrors.number = 'Неверный номер карты (ошибка Луна)';
    }

    if (!/^\d{2}\/\d{2}$/.test(newCard.expiry)) {
      newErrors.expiry = 'Формат ММ/ГГ';
    } else {
      const [month, year] = newCard.expiry.split('/').map(num => parseInt(num, 10));
      if (month < 1 || month > 12) {
        newErrors.expiry = 'Неверный месяц';
      } else {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = parseInt(now.getFullYear().toString().slice(-2), 10);
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiry = 'Карта просрочена';
        }
      }
    }

    if (!/^\d{3}$/.test(newCard.cvv)) {
      newErrors.cvv = '3 цифры CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setNewCard(prev => ({ ...prev, number: formatted }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setNewCard(prev => ({ ...prev, expiry: value }));
  };

  const handleCvvChange = (e) => {
    setNewCard(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }));
  };

  const handleDelete = (id) => {
    const updated = cards.filter(c => c.id !== id);
    setCards(updated);
    localStorage.setItem('vkusochka_cards', JSON.stringify(updated));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!validateCardForm()) return;

    const brand = getCardBrand(newCard.number);
    const last4 = newCard.number.replace(/\s/g, '').slice(-4);
    const updated = [...cards, { id: Date.now().toString(), last4, brand }];
    
    setCards(updated);
    localStorage.setItem('vkusochka_cards', JSON.stringify(updated));
    setNewCard({ number: '', expiry: '', cvv: '' });
    setErrors({});
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {cards.map(card => (
        <div key={card.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-tertiary text-[28px]">credit_card</span>
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface">{card.brand} •••• {card.last4}</span>
            </div>
          </div>
          <button onClick={() => handleDelete(card.id)} className="text-on-surface-variant hover:text-error transition-colors p-2">
            <span className="material-symbols-outlined text-[22px]">delete</span>
          </button>
        </div>
      ))}
      
      {!isAdding ? (
        <button 
          onClick={() => { setIsAdding(true); setErrors({}); }}
          className="p-4 border border-dashed border-outline-variant rounded-2xl text-on-surface-variant hover:text-primary-container hover:border-primary-container transition-all text-center font-label-md flex items-center justify-center gap-2 bg-surface-container-low"
        >
          <span className="material-symbols-outlined">add</span> Добавить карту
        </button>
      ) : (
        <form onSubmit={handleAdd} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-label-sm text-tertiary block">Номер новой карты</label>
              {newCard.number && (
                <span className="text-xs font-bold px-2 py-0.5 bg-primary-container/20 text-primary-container rounded">
                  {getCardBrand(newCard.number)}
                </span>
              )}
            </div>
            <input 
              type="text" 
              maxLength="19"
              value={newCard.number}
              onChange={handleNumberChange}
              placeholder="4242 4242 4242 4242"
              className={`w-full bg-surface border rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary-container transition-colors tracking-widest font-mono text-sm ${errors.number ? 'border-error' : 'border-outline-variant/50'}`}
              required
            />
            {errors.number && <p className="text-error text-xs mt-1 font-label-sm">{errors.number}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-label-sm text-tertiary mb-1 block">Срок (ММ/ГГ)</label>
              <input 
                type="text" 
                maxLength="5"
                value={newCard.expiry}
                onChange={handleExpiryChange}
                placeholder="12/28"
                className={`w-full bg-surface border rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary-container transition-colors font-mono text-sm ${errors.expiry ? 'border-error' : 'border-outline-variant/50'}`}
                required
              />
              {errors.expiry && <p className="text-error text-xs mt-1 font-label-sm">{errors.expiry}</p>}
            </div>
            <div>
              <label className="font-label-sm text-tertiary mb-1 block">CVV</label>
              <input 
                type="password" 
                maxLength="3"
                value={newCard.cvv}
                onChange={handleCvvChange}
                placeholder="•••"
                className={`w-full bg-surface border rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary-container transition-colors font-mono tracking-widest text-sm ${errors.cvv ? 'border-error' : 'border-outline-variant/50'}`}
                required
              />
              {errors.cvv && <p className="text-error text-xs mt-1 font-label-sm">{errors.cvv}</p>}
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 border border-outline-variant rounded-xl text-sm font-label-md text-on-surface-variant hover:bg-surface-container">Отмена</button>
            <Button type="submit" className="px-4 py-2 text-sm">Сохранить</Button>
          </div>
        </form>
      )}
    </div>
  );
}

function SavedAddressesView() {
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newType, setNewType] = useState('Дом');
  const [newText, setNewText] = useState('');

  useEffect(() => {
    const savedAddrs = localStorage.getItem('vkusochka_addresses');
    if (savedAddrs) {
      setAddresses(JSON.parse(savedAddrs));
    } else {
      const defaultAddrs = [
        { id: 1, type: 'Дом', text: 'Ленинградский проспект, 39с79, кв. 45' },
        { id: 2, type: 'Работа', text: 'ул. Пушкина, д. 10, офис 404' }
      ];
      localStorage.setItem('vkusochka_addresses', JSON.stringify(defaultAddrs));
      setAddresses(defaultAddrs);
    }
  }, []);

  const handleDelete = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('vkusochka_addresses', JSON.stringify(updated));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    const updated = [...addresses, { id: Date.now(), type: newType, text: newText.trim() }];
    setAddresses(updated);
    localStorage.setItem('vkusochka_addresses', JSON.stringify(updated));
    setNewText('');
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {addresses.map(addr => (
        <div key={addr.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-container text-[28px]">
              {addr.type === 'Дом' ? 'home' : addr.type === 'Работа' ? 'work' : 'location_on'}
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface font-bold">{addr.type}</span>
              <span className="font-body-md text-on-surface-variant text-sm">{addr.text}</span>
            </div>
          </div>
          <button onClick={() => handleDelete(addr.id)} className="text-on-surface-variant hover:text-error transition-colors p-2">
            <span className="material-symbols-outlined text-[22px]">delete</span>
          </button>
        </div>
      ))}

      {!isAdding ? (
        <button 
          onClick={() => setIsAdding(true)}
          className="p-4 border border-dashed border-outline-variant rounded-2xl text-on-surface-variant hover:text-primary-container hover:border-primary-container transition-all text-center font-label-md flex items-center justify-center gap-2 bg-surface-container-low"
        >
          <span className="material-symbols-outlined">add</span> Добавить адрес
        </button>
      ) : (
        <form onSubmit={handleAdd} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setNewType('Дом')} className={`py-2 rounded-xl border text-sm font-label-md ${newType === 'Дом' ? 'bg-primary-container text-on-primary-container border-primary-container' : 'border-outline-variant'}`}>Дом</button>
            <button type="button" onClick={() => setNewType('Работа')} className={`py-2 rounded-xl border text-sm font-label-md ${newType === 'Работа' ? 'bg-primary-container text-on-primary-container border-primary-container' : 'border-outline-variant'}`}>Работа</button>
          </div>
          <div>
            <label className="font-label-sm text-tertiary mb-1 block">Полный адрес</label>
            <input 
              type="text" 
              value={newText}
              onChange={e => setNewText(e.target.value)}
              placeholder="Город, улица, дом, квартира"
              className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary-container transition-colors text-sm"
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 border border-outline-variant rounded-xl text-sm font-label-md text-on-surface-variant hover:bg-surface-container">Отмена</button>
            <Button type="submit" className="px-4 py-2 text-sm">Сохранить</Button>
          </div>
        </form>
      )}
    </div>
  );
}

function SettingsView() {
  const userStr = localStorage.getItem('vkusochka_user');
  const user = userStr ? JSON.parse(userStr) : { name: '', email: '', phone: '' };
  const [profile, setProfile] = useState({ name: user.name, email: user.email, phone: user.phone || '' });

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
          disabled
          className="w-full bg-surface-container border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface-variant opacity-70 cursor-not-allowed"
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
            <Route path="fav-restaurants" element={<FavoriteRestaurantsView />} />
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