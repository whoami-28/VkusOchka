import React, { useState, useEffect } from 'react';

export default function ProductGallery({ mainImage, thumbnails }) {
  const [activeImage, setActiveImage] = useState(mainImage);

  useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30">
        <img 
          src={activeImage} 
          alt="Блюдо" 
          className="w-full h-full object-cover transition-opacity duration-300" 
        />
      </div>
      
      {thumbnails && thumbnails.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {thumbnails.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(thumb)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                activeImage === thumb 
                  ? 'border-primary-container' 
                  : 'border-transparent hover:border-outline-variant'
              }`}
            >
              <img 
                src={thumb} 
                alt={`Миниатюра ${idx + 1}`} 
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}