import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestaurantHero from '../components/menu/RestaurantHero';
import MenuSidebar from '../components/menu/MenuSidebar';
import DishCard from '../components/DishCard';
import FeaturedDishCard from '../components/menu/FeaturedDishCard';
import FloatingCartBar from '../components/menu/FloatingCartBar';

export default function RestaurantMenu() {
  const starters = [
    { id: 1, name: 'Томатный суп', price: '12.00', description: 'Запеченные фермерские томаты, чеснок и свежий базилик...', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhbduNoYg59lgI1DQ_5fW-fR5YwBn5MveJQdzzpbWXKWP46KRUf58zGyvjbOjBaGN22006blcquhoCEpCH1q-pcLMIFxIYIyUgaQfckYehC1lAv33cKtjacOZVhRn1nWRYXGx9VoAg2OJmhwJjP5PZwKHWo1_syv0zMxnEtuSYxzKgFxDmFlDLflito-qPm1TxceY5DamO_k5U6aA7eG7D2Lq42L12fwXhlQjct5fp1hZGYk-KVJs13h6bjsyXhMgaPX9rWD_2VEY' },
    { id: 2, name: 'Сырная тарелка', price: '24.00', description: 'Ассорти фермерских сыров, соты, сезонный джем и крекеры...', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAWcDYt4wsRFDqeb6MJ1x6wB0bT8vDai0PfLm_uHou8G1DVHdmHHI_y5Ra1btWvmYXYriIFGv0Jncm1vyN_CAhb75wi2_o-w14vbyvJ7Tsy8oKm6CMjblDqnZAyZt-cQRN_X9znj3YjLcXu7bsukBfvJfU_B74i_Vltjs2AW2htzHhm3m3lzf7-j5V1oGWI9XqFhMKd-j6KJjfsrBBvUle6vrhIxR3CADJPoGjpIOjoGKT-FO-NQulFIWtoHSxYrQI4DaAUJoAz6c' }
  ];

  const signatureDish = {
    name: 'Каре ягненка в травах', price: '42.00', description: 'Нежный ягненок в панировке из фисташек и сезонных трав с пюре из пастернака...', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqZM4eIgKLuHPc6AmBMfbatm0LGVmKYYEQ426-Qg4ZsBB7uuuxSASNONRFMwAwbM2L4D_vEddAiCEHqI__hRIE7Hj-URT-1oKpBhgjTSP8f6EDAs-_8b12-UVF2K71i7LmzV0UXMcB1tbPsWUFa3PVlst_EP1PwpOagDuXYrB1SDzWokrjxoNewZpSK1jg5Sqizqhekt7Pj_37qRnz_CCxcxIF8tvggmW_d5ssw7ih36zG0zP70JnZsNjR4SZ6tIgSHglz9o2m9lY'
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col pt-20 relative">
      <Header />
      <main className="flex-grow pb-32">
        <RestaurantHero />
        
        <div className="max-w-7xl mx-auto px-6 mt-lg flex flex-col md:flex-row gap-lg">
          <MenuSidebar />
          
          <div className="md:w-3/4 flex flex-col gap-xl">
            <section id="starters">
              <h2 className="font-h2 text-h2 text-on-background mb-md">Закуски</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {starters.map(dish => <DishCard key={dish.id} dish={dish} />)}
              </div>
            </section>

            <section id="mains">
              <h2 className="font-h2 text-h2 text-on-background mb-md">Горячие блюда</h2>
              <div className="flex flex-col gap-md">
                <FeaturedDishCard dish={signatureDish} />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingCartBar />
    </div>
  );
}