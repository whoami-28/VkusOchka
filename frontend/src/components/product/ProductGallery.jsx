import React from 'react';

export default function ProductGallery({ mainImage, thumbnails }) {
  return (
    <div className="flex flex-col gap-md">
      <div className="rounded-xl overflow-hidden bg-surface-container-high aspect-square md:aspect-[4/3] w-full shadow-sm relative">
        <img 
          src={mainImage} 
          alt="Main dish" 
          className="w-full h-full object-cover" 
        />
        {/* Плавающие теги */}
        <div className="absolute top-md left-md flex gap-sm">
          <span className="bg-surface/90 backdrop-blur-sm px-sm py-xs rounded-full text-primary font-label-sm border border-outline-variant">Vegan</span>
          <span className="bg-surface/90 backdrop-blur-sm px-sm py-xs rounded-full text-primary font-label-sm border border-outline-variant">Gluten Free</span>
        </div>
      </div>
      
      {/* Миниатюры */}
      <div className="hidden md:flex gap-sm">
        {thumbnails.map((thumb, idx) => (
          <div 
            key={idx} 
            className={`w-24 h-24 rounded-lg overflow-hidden cursor-pointer transition-opacity ${idx === 0 ? 'border-2 border-primary' : 'border border-outline-variant opacity-70 hover:opacity-100'}`}
          >
            <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}