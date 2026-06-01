import React, { useState, useEffect } from 'react';

export default function RestaurantHero({ restaurant }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('vkusochka_token');
    if (token) {
      fetch('http://localhost:5147/api/profile/favorite-restaurants', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setIsFavorite(data.some(fav => fav.id === restaurant.id));
        }
      })
      .catch(() => {});
    }
  }, [restaurant.id]);

  const toggleFavorite = async () => {
    const token = localStorage.getItem('vkusochka_token');
    if (!token) {
      alert('Для добавления в избранное необходимо войти в аккаунт');
      return;
    }

    try {
      const method = isFavorite ? 'DELETE' : 'POST';
      const res = await fetch(`http://localhost:5147/api/profile/favorite-restaurants/${restaurant.id}`, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        setIsFavorite(!isFavorite);
      }
    } catch (err) {
      console.error('Ошибка соединения с сервером', err);
    }
  };

  return (
    <div className="relative h-[300px] md:h-[400px] w-full mt-20">
      <img 
        src={restaurant.image || "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=400&fit=crop"} 
        alt={restaurant.name} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-margin-mobile md:p-lg max-w-7xl mx-auto flex justify-between items-end pb-8">
        <div>
          <h1 className="font-h1 text-[40px] md:text-[56px] text-on-surface leading-none mb-3">
            {restaurant.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-on-surface-variant font-label-md">
            <span className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-md text-on-surface">
              <span className="material-symbols-outlined text-primary-container text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 
              {restaurant.rating || "4.8"}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant/30">
              {restaurant.description}
            </span>
          </div>
        </div>
        
        <button 
          onClick={toggleFavorite} 
          className="w-14 h-14 rounded-full bg-surface flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors shadow-lg border border-outline-variant/30 flex-shrink-0"
        >
          <span 
            className="material-symbols-outlined text-[28px] transition-colors duration-300" 
            style={{ 
              fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0", 
              color: isFavorite ? 'var(--color-primary-container)' : 'inherit' 
            }}
          >
            favorite
          </span>
        </button>
      </div>
    </div>
  );
}