import React from 'react';
import Button from '../../ui/Button';

export default function OrderHistoryCard({ order }) {
  return (
    <article className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 overflow-hidden flex flex-col md:flex-row shadow-[0_4px_24px_rgba(40,40,39,0.04)]">
      {/* Картинка */}
      <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
        <img 
          src={order.image} 
          alt={order.restaurantName} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Инфо и действия */}
      <div className="p-6 flex flex-col justify-between flex-grow gap-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-1 bg-surface-container text-tertiary rounded font-label-sm text-[10px] uppercase">
                {order.status}
              </span>
              <span className="font-body-md text-sm text-tertiary">{order.date}</span>
            </div>
            <h2 className="font-h2 text-xl text-on-surface">{order.restaurantName}</h2>
            <p className="font-body-md text-tertiary mt-2">{order.items}</p>
          </div>
          <div className="text-right">
            <span className="font-h2 text-lg text-on-surface">${order.total}</span>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-2 border-t border-outline-variant/20 pt-4">
          <Button variant="secondary" className="px-6 py-3">View Receipt</Button>
          <Button className="px-6 py-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">refresh</span>
            Reorder
          </Button>
        </div>
      </div>
    </article>
  );
}