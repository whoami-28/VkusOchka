import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function DishCard({ dish }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(dish, 1, '');
  };

  const priceNum = Number(dish.price) || 0;

  return (
    <Link to={`/product/${dish.id}`} className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col group h-full">
      <div className="h-48 w-full overflow-hidden bg-surface-container relative">
        <img src={dish.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop"} alt={dish.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-h2 text-[18px] text-on-surface leading-tight">{dish.name}</h3>
        </div>
        <p className="font-body-md text-on-surface-variant text-sm line-clamp-2 mb-4 flex-grow">{dish.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/30">
          <span className="font-h2 text-[20px] text-primary-container">${priceNum.toFixed(2)}</span>
          <button onClick={handleAdd} className="w-10 h-10 bg-primary-container/10 text-primary-container rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors">
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
      </div>
    </Link>
  );
}