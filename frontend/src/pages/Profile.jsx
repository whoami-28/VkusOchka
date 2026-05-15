import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import OrderHistoryCard from '../components/profile/OrderHistoryCard';

export default function Profile() {
  const orders = [
    {
      id: 1,
      restaurantName: "Стейк-хаус 'Prime Cut'",
      status: "Доставлен",
      date: "24 Окт 2023 • 19:30",
      items: "1x Стейк Рибай, 1x Трюфельное пюре, 1x Спаржа на гриле",
      total: "85.50",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIUBe7VKH3z9CMd9hv_4zziGkPJsvy_wvQPgeDQ1FZgyy2RQkcaW5yjMUFyw-vVcW_m0ru4SWN-hPr6nVH5S0NrLJo89U-lsA8MEdAfdH-EQo4uWzlUcHRh74NlAU1XjlloKbgy0dphNZvEIWX05szWoAlzal-23f8muf7UO4tKkCO5Z7NRS-TYsq2NSf558qYL8Q3Fyk0E_7D6EjitqDVrWNVkZnmCf3qCEmO-T1VfsQAWnYxnsLZSuBpEcK-wFG74DgarnSvNaU"
    },
    {
      id: 2,
      restaurantName: "Суши-бар 'Океан'",
      status: "Доставлен",
      date: "18 Окт 2023 • 13:15",
      items: "1x Сет от шефа (12 шт), 1x Острый ролл с тунцом, 1x Мисо суп",
      total: "62.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA--e8tCEd_Qhzv2RQ_SFTevDkyfspPZJn5KdoP-GLCezGovkZLbl-7F2QHfJOOdXwBzr12LF3BrRP0HqOU9pUgWtGiVp7JIsxEHORtmtPSAfuh1ltLFZXU_diuryXT7AJCZni1vnvVtFEVdKLDnBOwl0ztk2AkVR_jCiU2atSILuGPi7jG8bNyGbypSGqRM7CinvgNd7skGoJ6cArQykolFOdaUXx7vfAGxm_bTWuxsmgeDeBCGgOhaV0iuHWKA7KF8OLetg3seyI"
    }
  ];

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col pt-20">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-6 py-lg flex flex-col md:flex-row gap-lg">
        <ProfileSidebar />
        
        <section className="flex-grow flex flex-col gap-md">
          <header className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
            <div>
              <h1 className="font-h1 text-on-surface">История заказов</h1>
              <p className="font-body-md text-tertiary mt-1">Просматривайте свои прошлые заказы и повторяйте любимые.</p>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-tertiary hover:text-on-surface hover:bg-surface-container transition-colors">
              <span className="font-label-md">За последние 30 дней</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </header>

          <div className="flex flex-col gap-6">
            {orders.map(order => (
              <OrderHistoryCard key={order.id} order={order} />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button className="text-primary-container font-label-md hover:underline underline-offset-4">
              Загрузить еще
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}