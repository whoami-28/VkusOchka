import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('vkusochka_fav_restaurants') || '[]');
    setIsFavorite(favs.some(fav => fav.id === restaurant.id));
  }, [restaurant.id]);

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    const favs = JSON.parse(localStorage.getItem('vkusochka_fav_restaurants') || '[]');
    let updatedFavs;
    
    if (isFavorite) {
      updatedFavs = favs.filter(fav => fav.id !== restaurant.id);
    } else {
      updatedFavs = [...favs, { 
        id: restaurant.id, 
        name: restaurant.name, 
        image: restaurant.image,
        description: restaurant.description,
        rating: restaurant.rating
      }];
    }
    
    localStorage.setItem('vkusochka_fav_restaurants', JSON.stringify(updatedFavs));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link 
      to={`/restaurant/${restaurant.id}`} 
      className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col group h-full"
    >
      <div className="h-48 w-full overflow-hidden relative bg-surface-container">
        <img 
          src={restaurant.image || "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop"} 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        <button 
          onClick={toggleFavorite} 
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background flex items-center justify-center text-on-surface-variant hover:text-primary-container shadow-md border border-outline-variant/30 transition-all z-10"
        >
          <span 
            className="material-symbols-outlined text-[24px] transition-colors duration-300" 
            style={{ 
              fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0", 
              color: isFavorite ? 'var(--color-primary-container)' : 'inherit' 
            }}
          >
            favorite
          </span>
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-h2 text-[18px] text-on-surface leading-tight truncate flex-grow">
            {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-surface-container px-1.5 py-0.5 rounded text-on-surface font-label-sm flex-shrink-0">
            {restaurant.rating || "4.8"}
            <span className="material-symbols-outlined text-[14px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
        </div>
        <p className="font-body-md text-on-surface-variant text-sm line-clamp-2 mb-4 flex-grow">
            {restaurant.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
            <span className="font-label-md text-on-surface-variant">От $25</span>
            <Button className="px-5 py-2 text-sm">Перейти</Button>
        </div>
        </div>
    </Link>
    );
}

function Button({ children, className }) {
    return (
    <div className={`bg-primary-container text-on-primary-container rounded-full flex items-center justify-center font-label-md hover:bg-primary transition-colors ${className}`}>
        {children}
    </div>
  );
}