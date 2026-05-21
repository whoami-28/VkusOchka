import React from 'react';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const priceNum = Number(item.price) || 0;
  const itemTotal = priceNum * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b border-outline-variant/30 last:border-0">
      <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container border border-outline-variant/20">
        <img 
          src={item.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDSLCgtR3sOKEvei80z9MMpJOPy6A8T0A6qB2HXoUKk5jdW_mIq3Q5Opa0GV6jMbcFRY5wnoOkTKU9Qk64gjNYBqvWyfc8hU6zJrjTrGvRdqt6-SFEr0OdfrEwEUfrP71V4YcJ5012tQ8GmNrj6n0dU5kKa-jf_QNRAUCJY4uOBqNipOf0tm9NEp9eSqWIaw3m50SLr7WoU3GZfGnRIj5UrcFwHNTfJ_kEUh3RoL8KHqjFrzPSDxKsmrj8AV_koJcOWN5T0bx9lv2g"} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="flex-grow w-full flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-h2 text-[18px] text-on-surface leading-tight">{item.name}</h3>
            <button 
              onClick={() => removeFromCart(item.id, item.note)} 
              className="text-on-surface-variant hover:text-error transition-colors p-1"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
          {item.note && <p className="font-label-sm text-tertiary mb-2">{item.note}</p>}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center border border-outline-variant rounded-lg h-9 bg-surface">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1, item.note)} 
              className="px-2 h-full flex items-center justify-center text-tertiary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="font-label-md text-on-surface w-8 text-center">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1, item.note)} 
              className="px-2 h-full flex items-center justify-center text-tertiary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
          <span className="font-h2 text-[18px] text-primary-container">${itemTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}