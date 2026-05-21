import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useCart } from '../context/CartContext';

export default function DishCard({ dish }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant flex flex-col h-full group">
      <Link to={`/product/${dish.id}`} className="h-48 overflow-hidden relative block">
        <img src={dish.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBhbduNoYg59lgI1DQ_5fW-fR5YwBn5MveJQdzzpbWXKWP46KRUf58zGyvjbOjBaGN22006blcquhoCEpCH1q-pcLMIFxIYIyUgaQfckYehC1lAv33cKtjacOZVhRn1nWRYXGx9VoAg2OJmhwJjP5PZwKHWo1_syv0zMxnEtuSYxzKgFxDmFlDLflito-qPm1TxceY5DamO_k5U6aA7eG7D2Lq42L12fwXhlQjct5fp1hZGYk-KVJs13h6bjsyXhMgaPX9rWD_2VEY"} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${dish.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-h2 text-[20px] leading-tight text-on-background">{dish.name}</h3>
          </Link>
          <span className="font-label-md text-primary">${dish.price}</span>
        </div>
        <p className="font-body-md text-on-surface-variant line-clamp-2 mb-4 flex-grow">{dish.description}</p>
        
        <Button onClick={() => addToCart(dish)}>
          <span className="material-symbols-outlined">add</span> В корзину
        </Button>
      </div>
    </div>
  );
}