import React from 'react';

export default function CartItem({ item }) {
  return (
    <div className="bg-surface rounded-xl p-md flex flex-col sm:flex-row gap-md border border-outline-variant/30">
      {/* Изображение */}
      <div className="w-full sm:w-[120px] h-[120px] rounded-lg overflow-hidden shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Информация и управление */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-xs">
            <h2 className="font-h2 text-h2 text-on-surface">{item.name}</h2>
            <span className="font-label-md text-label-md text-primary">${item.price}</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-sm">{item.category}</p>
          {item.note && (
            <p className="font-body-md text-body-md text-on-surface-variant text-sm italic mb-sm">{item.note}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          {/* Управление количеством */}
          <div className="flex items-center gap-4 bg-surface-container rounded-full px-xs py-xs">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <span className="font-label-md text-label-md w-4 text-center">{item.quantity}</span>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
          
          {/* Действия (Избранное / Удалить) */}
          <div className="flex gap-sm">
            <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              <span className="hidden sm:inline">Save to Favorites</span>
            </button>
            <button className="flex items-center gap-2 text-error hover:text-error-container transition-colors font-label-md text-label-md ml-4">
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}