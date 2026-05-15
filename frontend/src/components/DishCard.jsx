import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function DishCard({ dish }) {
  return (
    <div className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant flex flex-col h-full group">
      <Link to={`/product/${dish.id}`} className="h-48 overflow-hidden relative block">
        <img src={dish.imageUrl || dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${dish.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-h2 text-[20px] leading-tight text-on-background">{dish.name}</h3>
          </Link>
          <span className="font-label-md text-primary">${dish.price}</span>
        </div>
        <p className="font-body-md text-on-surface-variant line-clamp-2 mb-4 flex-grow">{dish.description}</p>
        
        <Button>
          <span className="material-symbols-outlined">add</span> Add to Cart
        </Button>
      </div>
    </div>
  );
}