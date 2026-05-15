import React from 'react';
import Button from '../../ui/Button';

export default function FeaturedDishCard({ dish }) {
  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant flex flex-col md:flex-row group">
      <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm shadow-sm">
          От шеф-повара
        </div>
      </div>
      <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-h1 text-[28px] text-on-background leading-tight">{dish.name}</h3>
          <span className="font-h2 text-h2 text-primary">${dish.price}</span>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">{dish.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 border border-outline text-on-surface font-label-sm text-label-sm rounded-full">Без глютена</span>
          <span className="px-3 py-1 border border-outline text-on-surface font-label-sm text-label-sm rounded-full">Много белка</span>
        </div>
        <Button className="w-full md:w-auto px-8 self-start">
          <span className="material-symbols-outlined">add</span> В корзину
        </Button>
      </div>
    </div>
  );
}