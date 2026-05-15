import React from 'react';

export default function FloatingCartBar({ itemsCount = 2, total = "36.00" }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-surface-container-highest border-t border-outline-variant p-4 md:p-6 z-40 shadow-[0_-4px_20px_rgba(40,40,39,0.08)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-container text-on-primary rounded-full flex items-center justify-center font-h2 text-h2">
            {itemsCount}
          </div>
          <div className="hidden sm:block text-on-background font-body-lg text-body-lg">
            Items in Cart
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6 flex-grow justify-end">
          <span className="font-h2 text-h2 text-on-background">${total}</span>
          <button className="px-6 md:px-8 h-14 bg-on-background text-surface rounded font-label-md text-label-md flex justify-center items-center gap-2 hover:bg-on-surface-variant transition-colors whitespace-nowrap">
            View Cart <span className="material-symbols-outlined hidden sm:inline">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}