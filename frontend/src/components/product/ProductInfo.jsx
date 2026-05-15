import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

export default function ProductInfo({ product }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center gap-xs text-tertiary font-label-md mb-sm">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface">Signature</span>
        </div>

        <h1 className="font-h1 text-on-surface mb-xs">{product.name}</h1>
        
        <div className="flex items-center justify-between mb-md">
          <span className="font-h2 text-primary-container">${product.price}</span>
          <div className="flex items-center gap-xs text-tertiary font-label-sm">
            <span className="material-symbols-outlined text-[16px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span>{product.rating} ({product.reviews} reviews)</span>
          </div>
        </div>

        <p className="font-body-md text-on-surface-variant mb-lg">{product.description}</p>

        <div className="mb-lg border-t border-outline-variant pt-md">
          <h3 className="font-label-md text-on-surface mb-sm">Choose Base</h3>
          <div className="flex flex-wrap gap-sm">
            <button className="px-md py-sm rounded-lg border-2 border-primary-container bg-secondary-container/20 text-on-surface font-label-md">Quinoa</button>
            <button className="px-md py-sm rounded-lg border border-outline-variant text-on-surface-variant font-label-md hover:bg-surface-container">Brown Rice</button>
            <button className="px-md py-sm rounded-lg border border-outline-variant text-on-surface-variant font-label-md hover:bg-surface-container">Mixed Greens</button>
          </div>
        </div>

        <div className="mb-lg grid grid-cols-4 gap-sm bg-surface-container-low p-md rounded-xl border border-outline-variant/30">
          <div className="flex flex-col items-center">
            <span className="font-h2 text-on-surface">420</span>
            <span className="font-label-sm text-tertiary">CAL</span>
          </div>
          <div className="flex flex-col items-center border-l border-outline-variant/30">
            <span className="font-h2 text-on-surface">12g</span>
            <span className="font-label-sm text-tertiary">PRO</span>
          </div>
          <div className="flex flex-col items-center border-l border-outline-variant/30">
            <span className="font-h2 text-on-surface">48g</span>
            <span className="font-label-sm text-tertiary">CARB</span>
          </div>
          <div className="flex flex-col items-center border-l border-outline-variant/30">
            <span className="font-h2 text-on-surface">18g</span>
            <span className="font-label-sm text-tertiary">FAT</span>
          </div>
        </div>
      </div>

      <div className="mt-auto bg-surface py-md border-t border-outline-variant/30 md:border-none sticky bottom-0 z-40 md:static flex flex-col gap-sm">
        <div className="flex items-center gap-md mb-sm md:mb-0">
          <div className="flex items-center border border-outline-variant rounded-lg h-12">
            <button className="px-sm h-full flex items-center justify-center text-tertiary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="font-label-md text-on-surface w-8 text-center">1</span>
            <button className="px-sm h-full flex items-center justify-center text-tertiary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <Button className="flex-grow shadow-sm">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
            Add to Order - ${product.price}
          </Button>
        </div>
        <div className="text-center font-label-sm text-tertiary">
          Estimated preparation time: 10-15 mins
        </div>
      </div>
    </div>
  );
}