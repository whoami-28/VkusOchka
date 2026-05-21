import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuSidebar from '../components/menu/MenuSidebar';
import DishCard from '../components/DishCard';
import FeaturedDishCard from '../components/menu/FeaturedDishCard';
import FloatingCartBar from '../components/menu/FloatingCartBar';

export default function RestaurantMenu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://localhost:5147/api/restaurants/${id}`)
      .then(res => res.json())
      .then(data => {
        setRestaurant(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div className="p-md text-center text-on-surface pt-32">Загрузка меню...</div>;
  }

  if (!restaurant) {
    return <div className="p-md text-center text-on-surface pt-32">Ресторан не найден</div>;
  }

  const signatureDish = restaurant.dishes?.find(d => d.isRecommended) || restaurant.dishes?.[0];
  const regularDishes = restaurant.dishes?.filter(d => d.id !== signatureDish?.id) || [];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col pt-20 relative">
      <Header />
      <main className="flex-grow pb-32">
        <section className="relative w-full h-[400px] md:h-[500px]">
          <img 
            src={restaurant.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAf1v9_OEsCcN6Xp4Srp1m84n0XtTQSqg4f12KEob3FpkkMWYw7aFYlGXP-8xs0prvPh1_Xb_aBLEQUhO6SsKDMp3yGVwU_dKlWHG-DbEtbDlvpiTgcXlYAM3GZaO230SOBPqbzOkFYvQcuZekQCXi_dIkW2RncqU4byPdPporvg5YUWfVdutgWXyifR8FMky34cV2A11OE2Bo6Xc-Psp1hO5lnzYxieghBnQ3kt55X_xC9B2BmpLMqrAUdVZ9f8V1u4aoVV7vmMH0"} 
            alt={restaurant.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 max-w-7xl mx-auto">
            <h1 className="font-h1 text-h1 text-white mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white font-body-md text-body-md opacity-90">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 
                {restaurant.rating || "4.8"} (500+ оценок)
              </span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span>{restaurant.description}</span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined">schedule</span> 30-45 мин
              </span>
            </div>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-6 mt-lg flex flex-col md:flex-row gap-lg">
          <MenuSidebar />
          
          <div className="md:w-3/4 flex flex-col gap-xl">
            {regularDishes.length > 0 && (
              <section id="starters">
                <h2 className="font-h2 text-h2 text-on-background mb-md font-bold">Меню заведения</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {regularDishes.map(dish => <DishCard key={dish.id} dish={dish} />)}
                </div>
              </section>
            )}

            {signatureDish && (
              <section id="mains">
                <h2 className="font-h2 text-h2 text-on-background mb-md font-bold">Шедевр от шефа</h2>
                <div className="flex flex-col gap-md">
                  <FeaturedDishCard dish={signatureDish} />
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingCartBar />
    </div>
  );
}