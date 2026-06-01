import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import Button from '../ui/Button';
import { useCart } from '../context/CartContext';

function useFetchWithAuth() {
  const navigate = useNavigate();

  return (url, options = {}) => {
    const token = localStorage.getItem('vkusochka_token');
    
    if (!token) {
      navigate('/auth');
      return Promise.reject('No token');
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 401) {
        localStorage.removeItem('vkusochka_token');
        localStorage.removeItem('vkusochka_user');
        navigate('/auth');
        throw new Error('Unauthorized');
      }
      if (!res.ok) {
        throw new Error('API Error');
      }
      return res;
    });
  };
}

function OrderHistoryView() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAuth = useFetchWithAuth();

  useEffect(() => {
    fetchAuth('http://localhost:5147/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
        else setOrders([]);
      })
      .catch(() => setOrders([]))
      .finally(() => setIsLoading(false));
  }, []);

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
  const fetchAuth = useFetchWithAuth();

  useEffect(() => {
    fetchAuth('http://localhost:5147/api/profile/favorite-restaurants')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFavs(data);
        else setFavs([]);
      })
      .catch(() => setFavs([]));
  }, []);

  const removeFav = (id) => {
    fetchAuth(`http://localhost:5147/api/profile/favorite-restaurants/${id}`, { method: 'DELETE' })
      .then(() => setFavs(favs.filter(f => f.id !== id)))
      .catch(() => {});
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
        <div key={fav.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
          <div className="h-40 w-full overflow-hidden relative">
            <img 
              src={fav.image || 'https://via.placeholder.com/400x200?text=No+Image'} 
              alt={fav.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-label-sm text-on-surface text-sm">{fav.rating || 'Новый'}</span>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-h2 text-[20px] text-on-surface mb-1">{fav.name}</h3>
            <p className="font-body-md text-on-surface-variant text-sm line-clamp-2 mb-4 flex-grow">
              {fav.description || 'Одно из ваших любимых заведений. Закажите что-нибудь вкусное прямо сейчас!'}
            </p>
            <div className="flex gap-2 mt-auto">
              <Button onClick={() => navigate(`/restaurant/${fav.id}`)} className="flex-grow py-2.5 text-sm flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                В меню
              </Button>
              <button 
                onClick={() => removeFav(fav.id)} 
                className="px-3 py-2.5 bg-error/10 text-error rounded-xl hover:bg-error/20 transition-colors flex items-center justify-center"
                title="Удалить из избранного"
              >
                <span className="material-symbols-outlined text-[20px]">heart_broken</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FavoriteCartsView() {
  const [favorites, setFavorites] = useState([]);
  const fetchAuth = useFetchWithAuth();
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuth('http://localhost:5147/api/profile/favorite-carts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFavorites(data);
        else setFavorites([]);
      })
      .catch(() => setFavorites([]));
  }, []);

  const handleDelete = (id) => {
    fetchAuth(`http://localhost:5147/api/profile/favorite-carts/${id}`, { method: 'DELETE' })
      .then(() => setFavorites(favorites.filter(f => f.id !== id)))
      .catch(() => {});
  };

  const handleRepeatCart = (fav) => {
    clearCart();
    fav.items.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        restaurantId: item.restaurantId
      }, item.quantity);
    });
    navigate('/cart');
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
            <Button onClick={() => handleRepeatCart(fav)} className="px-4 py-2 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
              Повторить
            </Button>
            <button onClick={() => handleDelete(fav.id)} className="text-error hover:bg-error/10 transition-colors p-2 rounded-lg flex items-center gap-1">
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
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
  const fetchAuth = useFetchWithAuth();

  useEffect(() => {
    fetchAuth('http://localhost:5147/api/profile/cards')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCards(data);
        else setCards([]);
      })
      .catch(() => setCards([]));
  }, []);

  const validateCardForm = () => {
    const newErrors = {};
    const cleanNumber = newCard.number.replace(/\s/g, '');
    if (cleanNumber.length !== 16) newErrors.number = 'Номер карты должен состоять из 16 цифр';
    if (!/^\d{2}\/\d{2}$/.test(newCard.expiry)) newErrors.expiry = 'Формат ММ/ГГ';
    if (!/^\d{3}$/.test(newCard.cvv)) newErrors.cvv = '3 цифры CVV';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setNewCard(prev => ({ ...prev, number: value.replace(/(\d{4})(?=\d)/g, '$1 ').trim() }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
    setNewCard(prev => ({ ...prev, expiry: value }));
  };

  const handleDelete = (id) => {
    fetchAuth(`http://localhost:5147/api/profile/cards/${id}`, { method: 'DELETE' })
      .then(() => setCards(cards.filter(c => c.id !== id)))
      .catch(() => {});
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!validateCardForm()) return;

    fetchAuth('http://localhost:5147/api/profile/cards', {
      method: 'POST',
      body: JSON.stringify({ number: newCard.number })
    })
    .then(res => res.json())
    .then(data => {
      setCards([...cards, data]);
      setIsAdding(false);
      setNewCard({ number: '', expiry: '', cvv: '' });
    })
    .catch(() => {});
  };

  return (
    <div className="flex flex-col gap-3">
      {cards.map(card => (
        <div key={card.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-tertiary text-[28px]">credit_card</span>
            <span className="font-label-md text-on-surface">{card.maskedNumber}</span>
          </div>
          <button onClick={() => handleDelete(card.id)} className="text-on-surface-variant hover:text-error transition-colors p-2">
            <span className="material-symbols-outlined text-[22px]">delete</span>
          </button>
        </div>
      ))}
      
      {!isAdding ? (
        <button onClick={() => setIsAdding(true)} className="p-4 border border-dashed border-outline-variant rounded-2xl text-on-surface-variant hover:text-primary-container hover:border-primary-container transition-all text-center font-label-md flex items-center justify-center gap-2 bg-surface-container-low">
          <span className="material-symbols-outlined">add</span> Добавить карту
        </button>
      ) : (
        <form onSubmit={handleAdd} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
          <div>
            <label className="font-label-sm text-tertiary block mb-1">Номер карты</label>
            <input type="text" maxLength="19" value={newCard.number} onChange={handleNumberChange} placeholder="4242 4242 4242 4242" className={`w-full bg-surface border rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary-container transition-colors tracking-widest font-mono text-sm ${errors.number ? 'border-error' : 'border-outline-variant/50'}`} />
            {errors.number && <p className="text-error text-xs mt-1">{errors.number}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-label-sm text-tertiary block mb-1">Срок (ММ/ГГ)</label>
              <input type="text" maxLength="5" value={newCard.expiry} onChange={handleExpiryChange} placeholder="12/28" className={`w-full bg-surface border rounded-xl px-4 py-2.5 text-on-surface font-mono text-sm ${errors.expiry ? 'border-error' : 'border-outline-variant/50'}`} />
              {errors.expiry && <p className="text-error text-xs mt-1">{errors.expiry}</p>}
            </div>
            <div>
              <label className="font-label-sm text-tertiary block mb-1">CVV</label>
              <input type="password" maxLength="3" value={newCard.cvv} onChange={e => setNewCard(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))} placeholder="•••" className={`w-full bg-surface border rounded-xl px-4 py-2.5 text-on-surface font-mono text-sm ${errors.cvv ? 'border-error' : 'border-outline-variant/50'}`} />
              {errors.cvv && <p className="text-error text-xs mt-1">{errors.cvv}</p>}
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 border border-outline-variant rounded-xl text-sm font-label-md hover:bg-surface-container">Отмена</button>
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
  const [newText, setNewText] = useState('');
  const [error, setError] = useState('');
  const fetchAuth = useFetchWithAuth();

  useEffect(() => {
    fetchAuth('http://localhost:5147/api/profile/addresses')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAddresses(data);
        else setAddresses([]);
      })
      .catch(() => setAddresses([]));
  }, []);

  const handleDelete = (id) => {
    fetchAuth(`http://localhost:5147/api/profile/addresses/${id}`, { method: 'DELETE' })
      .then(() => setAddresses(addresses.filter(a => a.id !== id)))
      .catch(() => {});
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const cleanAddress = newText.trim();
    if (cleanAddress.length < 10 || cleanAddress.length > 150) {
      setError('Адрес должен содержать от 10 до 150 символов.');
      return;
    }
    if (!/[a-zA-Zа-яА-ЯёЁ]/.test(cleanAddress)) {
      setError('Адрес должен содержать буквы.');
      return;
    }
    if (cleanAddress.includes('--') || cleanAddress.includes('  ') || /(.)\1{4,}/.test(cleanAddress)) {
      setError('Адрес содержит недопустимые повторения символов.');
      return;
    }

    fetchAuth('http://localhost:5147/api/profile/addresses', {
      method: 'POST',
      body: JSON.stringify({ fullAddress: cleanAddress })
    })
    .then(res => res.json())
    .then(data => {
      setAddresses([...addresses, data]);
      setNewText('');
      setIsAdding(false);
      setError('');
    })
    .catch(() => setError('Ошибка сохранения. Проверьте правильность адреса.'));
  };

  return (
    <div className="flex flex-col gap-3">
      {addresses.map(addr => (
        <div key={addr.id} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-container text-[28px]">location_on</span>
            <span className="font-body-md text-on-surface-variant text-sm">{addr.fullAddress}</span>
          </div>
          <button onClick={() => handleDelete(addr.id)} className="text-on-surface-variant hover:text-error transition-colors p-2">
            <span className="material-symbols-outlined text-[22px]">delete</span>
          </button>
        </div>
      ))}

      {!isAdding ? (
        <button onClick={() => setIsAdding(true)} className="p-4 border border-dashed border-outline-variant rounded-2xl text-on-surface-variant hover:text-primary-container hover:border-primary-container transition-all text-center font-label-md flex items-center justify-center gap-2 bg-surface-container-low">
          <span className="material-symbols-outlined">add</span> Добавить адрес
        </button>
      ) : (
        <form onSubmit={handleAdd} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
          <div>
            <label className="font-label-sm text-tertiary mb-1 block">Полный адрес</label>
            <input type="text" value={newText} onChange={e => {setNewText(e.target.value); setError('');}} placeholder="Город, улица, дом, квартира" maxLength="150" className={`w-full bg-surface border rounded-xl px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary-container text-sm ${error ? 'border-error' : 'border-outline-variant/50'}`} />
            {error && <p className="text-error text-xs mt-1">{error}</p>}
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => {setIsAdding(false); setError('');}} className="px-4 py-2 border border-outline-variant rounded-xl text-sm font-label-md hover:bg-surface-container">Отмена</button>
            <Button type="submit" className="px-4 py-2 text-sm">Сохранить</Button>
          </div>
        </form>
      )}
    </div>
  );
}

function SettingsView() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fetchAuth = useFetchWithAuth();

  useEffect(() => {
    fetchAuth('http://localhost:5147/api/profile/settings')
      .then(res => res.json())
      .then(data => setProfile({ name: data.name, email: data.email }))
      .catch(() => {});
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const cleanName = profile.name.trim();

    if (cleanName.length < 2 || cleanName.length > 50 || !/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(cleanName) || cleanName.includes('--') || cleanName.includes('  ') || /(.)\1{3,}/.test(cleanName)) {
      setError('Имя должно быть от 2 до 50 символов (без спецсимволов и повторений).');
      setSuccess(false);
      return;
    }

    fetchAuth('http://localhost:5147/api/profile/settings', {
      method: 'PUT',
      body: JSON.stringify({ name: cleanName })
    })
    .then(res => {
      if(!res.ok) throw new Error();
      setSuccess(true);
      setError('');
      setTimeout(() => setSuccess(false), 3000);
      
      const localUser = JSON.parse(localStorage.getItem('vkusochka_user'));
      if(localUser) {
        localUser.name = cleanName;
        localStorage.setItem('vkusochka_user', JSON.stringify(localUser));
      }
    })
    .catch(() => setError('Ошибка при обновлении данных'));
  };

  return (
    <form onSubmit={handleSave} className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
      <div>
        <label className="font-label-sm text-tertiary mb-1 block">Ваше имя</label>
        <input type="text" value={profile.name} onChange={e => {setProfile({...profile, name: e.target.value}); setError('');}} maxLength="50" className={`w-full bg-surface border rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container ${error ? 'border-error' : 'border-outline-variant/50'}`} />
        {error && <p className="text-error text-xs mt-1">{error}</p>}
      </div>
      <div>
        <label className="font-label-sm text-tertiary mb-1 block">Email (нельзя изменить)</label>
        <input type="email" value={profile.email} disabled className="w-full bg-surface-container border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface-variant opacity-70 cursor-not-allowed" />
      </div>
      
      <div className="flex items-center gap-4 mt-2">
        <Button type="submit" className="w-fit px-6">Сохранить изменения</Button>
        {success && <span className="text-primary-container font-label-md flex items-center gap-1"><span className="material-symbols-outlined">check_circle</span> Успешно сохранено</span>}
      </div>
    </form>
  );
}

export default function Profile() {
  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-lg md:py-xl pt-36">
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