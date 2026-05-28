import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

export default function HeroBanner() {
  const [promoCopied, setPromoCopied] = useState(false);

  const handleGetPromo = () => {
    navigator.clipboard.writeText('VKUS20');
    setPromoCopied(true);
    setTimeout(() => setPromoCopied(false), 3000);
  };

  return (
    <div className="relative bg-surface-container-low rounded-3xl overflow-hidden mb-12 flex flex-col md:flex-row items-center border border-outline-variant/30 shadow-sm">
      <div className="p-8 md:p-12 lg:p-16 flex flex-col gap-6 w-full md:w-[55%] z-10 relative">
        <span className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full font-label-md w-fit flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">sell</span>
          Скидка 20% на первый заказ!
        </span>
        <h1 className="font-h1 text-[40px] md:text-[48px] lg:text-[56px] text-on-surface leading-[1.1]">
          Быстрая доставка вкусной еды
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-md">
          Любимые блюда из лучших ресторанов города. Доставим горячими за 45 минут прямо к вашей двери.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <Link to="/browse">
            <Button className="px-8 py-4 text-[16px] shadow-sm">
              Выбрать блюдо
            </Button>
          </Link>
          <button
            onClick={handleGetPromo}
            className={`px-6 py-4 rounded-full font-label-md transition-all shadow-sm flex items-center gap-2 ${
              promoCopied
                ? 'bg-secondary-container text-on-secondary-container border-secondary-container'
                : 'bg-surface text-on-surface border border-outline-variant hover:bg-surface-container hover:border-primary-container'
            }`}
          >
            {promoCopied ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                Код VKUS20 скопирован
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">content_copy</span>
                Получить промокод
              </>
            )}
          </button>
        </div>
      </div>
      <div className="w-full md:w-[45%] h-[300px] md:h-full relative overflow-hidden hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&h=800&fit=crop"
          alt="Вкусная еда"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low to-transparent w-1/3"></div>
      </div>
    </div>
  );
}