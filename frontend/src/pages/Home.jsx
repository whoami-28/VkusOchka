import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/home/HeroBanner';
import CategoryCarousel from '../components/home/CategoryCarousel';
import RestaurantCard from '../components/RestaurantCard';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5147/api/restaurants')
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-lg md:py-xl pt-36">
      <HeroBanner />
      <CategoryCarousel />
      
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-h2 text-h2 text-on-surface">Популярные заведения</h2>
          <Link to="/browse" className="font-label-md text-primary-container hover:underline flex items-center gap-1">
            Смотреть все
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-on-surface-variant font-label-md">Загрузка ресторанов...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}