import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKitchenId = searchParams.get('kitchenId') ? parseInt(searchParams.get('kitchenId')) : null;

  const [restaurants, setRestaurants] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKitchen, setSelectedKitchen] = useState(initialKitchenId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5147/api/kitchens')
      .then(res => res.json())
      .then(data => setKitchens(data))
      .catch(err => {});
  }, []);

  const handleKitchenSelect = (id) => {
    setSelectedKitchen(id);
    if (id) {
      setSearchParams({ kitchenId: id });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let url = `http://localhost:5147/api/restaurants?search=${encodeURIComponent(searchQuery)}`;
    if (selectedKitchen) {
      url += `&kitchenId=${selectedKitchen}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, [searchQuery, selectedKitchen]);

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-lg md:py-xl pt-28">
      <div className="flex flex-col gap-6 mb-8">
        <h1 className="font-h1 text-[32px] md:text-[40px] text-on-surface leading-none">Все рестораны</h1>
        
        <div className="relative w-full max-w-2xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-tertiary">search</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Название ресторана или блюда..."
            className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl pl-12 pr-4 py-3.5 text-on-surface focus:outline-none focus:border-primary-container transition-colors shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => handleKitchenSelect(null)}
            className={`px-4 py-2 rounded-xl font-label-md border transition-all flex-shrink-0 ${!selectedKitchen ? 'bg-primary-container text-on-primary-container border-primary-container shadow-sm' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'}`}
          >
            Все кухни
          </button>
          {kitchens.map(kitchen => (
            <button
              key={kitchen.id}
              onClick={() => handleKitchenSelect(kitchen.id)}
              className={`px-4 py-2 rounded-xl font-label-md border transition-all flex-shrink-0 ${selectedKitchen === kitchen.id ? 'bg-primary-container text-on-primary-container border-primary-container shadow-sm' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'}`}
            >
              {kitchen.name}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-on-surface-variant font-label-md">Поиск заведений...</div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-12 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
          <span className="material-symbols-outlined text-[48px] text-tertiary mb-2">search_off</span>
          <p className="font-body-md text-on-surface-variant">Ничего не найдено. Попробуйте изменить параметры фильтра.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
}