import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantHero from '../components/menu/RestaurantHero';
import DishCard from '../components/DishCard';

export default function RestaurantMenu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5147/api/restaurants/${id}`)
      .then(res => res.json())
      .then(data => {
        setRestaurant(data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div className="pt-32 pb-32 text-center font-label-md text-on-surface-variant">Загрузка меню...</div>;
  }

  if (!restaurant) {
    return <div className="pt-32 pb-32 text-center font-h2 text-error">Ресторан не найден</div>;
  }

  const recommendedDishes = restaurant.dishes?.filter(d => d.isRecommended) || [];
  const otherDishes = restaurant.dishes?.filter(d => !d.isRecommended) || [];

  return (
    <div className="flex-grow w-full pb-24 relative">
      <RestaurantHero restaurant={restaurant} />
      
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-lg py-lg">
        {recommendedDishes.length > 0 && (
          <div className="mb-12">
            <h2 className="font-h2 text-[24px] text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              Рекомендуем
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedDishes.map(dish => <DishCard key={dish.id} dish={dish} />)}
            </div>
          </div>
        )}
        
        {otherDishes.length > 0 && (
          <div>
            <h2 className="font-h2 text-[24px] text-on-surface mb-6">Всё меню</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherDishes.map(dish => <DishCard key={dish.id} dish={dish} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}