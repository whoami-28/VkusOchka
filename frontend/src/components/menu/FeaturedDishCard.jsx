import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { useCart } from '../../context/CartContext';

export default function FeaturedDishCard({ dish }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant flex flex-col md:flex-row group">
      <Link to={`/product/${dish.id}`} className="md:w-2/5 h-64 md:h-auto relative overflow-hidden block">
        <img src={dish.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAqZM4eIgKLuHPc6AmBMfbatm0LGVmKYYEQ426-Qg4ZsBB7uuuxSASNONRFMwAwbM2L4D_vEddAiCEHqI__hRIE7Hj-URT-1oKpBhgjTSP8f6EDAs-_8b12-UVF2K71i7LmzV0UXMcB1tbPsWUFa3PVlst_EP1PwpOagDuXYrB1SDzWokrjxoNewZpSK1jg5Sqizqhekt7Pj_37qRnz_CCxcxIF8tvggmW_d5ssw7ih36zG0zP70JnZsNjR4SZ6tIgSHglz9o2m9lY"} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm shadow-sm">
          От шеф-повара
        </div>
      </Link>
      <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${dish.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-h1 text-[28px] text-on-background leading-tight">{dish.name}</h3>
          </Link>
          <span className="font-h2 text-h2 text-primary">${dish.price}</span>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">{dish.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 border border-outline text-on-surface font-label-sm text-label-sm rounded-full">Без глютена</span>
          <span className="px-3 py-1 border border-outline text-on-surface font-label-sm text-label-sm rounded-full">Много белка</span>
        </div>
        <Button className="w-full md:w-auto px-8 self-start" onClick={() => addToCart(dish)}>
          <span className="material-symbols-outlined">add</span> В корзину
        </Button>
      </div>
    </div>
  );
}