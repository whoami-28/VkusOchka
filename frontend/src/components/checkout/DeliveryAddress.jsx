import React from 'react';

export default function DeliveryAddress() {
  return (
    <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md">
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-h2 text-h2 text-on-surface">Адрес доставки</h2>
        <button className="font-label-md text-label-md text-primary-container hover:text-primary transition-colors flex items-center gap-xs">
          <span className="material-symbols-outlined text-[18px]">edit</span>
          Изменить
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-md">
        <div className="flex-1 font-body-md text-body-md text-on-surface-variant">
          <p className="font-label-md text-on-surface mb-xs">Дом</p>
          <p>123 Culinary Boulevard, Apt 4B</p>
          <p>Gastronomy District</p>
          <p>New York, NY 10012</p>
          <p className="mt-sm flex items-center gap-xs text-tertiary">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            Ожидаемая доставка: 30-45 мин
          </p>
        </div>
        <div className="w-full md:w-[200px] h-[120px] rounded-lg overflow-hidden border border-outline-variant/20 bg-surface-container-low flex items-center justify-center relative">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPuMpiH2X_GiwF0hJA9UDUhyFyrBvI3ad3fRjKfF4KLMGfleLSh6_1JbBN9F2AukLWN-LwkDkICydn-ssPPe5zsamPlp-yAi0HkpO28GRH3L8Xw0_BJLWSQBOf8tTOjjONkIhX3Ai9TrU04rmC1Qb3F9JMN8Qzf3XC3qcd9Vkyoxxio7vemsdcdkaDFJEcqR9p9mh7ebZdFdH4b__5LtRXeGJqKynGDVyMFMb42lyS7uOAZfJS7a6d6UpVN1Dq0noLmHDXOPhhzxs" 
            alt="Map location" 
            className="w-full h-full object-cover absolute inset-0" 
          />
        </div>
      </div>
    </section>
  );
}