import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCarousel() {
  const [kitchens, setKitchens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5147/api/kitchens')
      .then(res => res.json())
      .then(data => setKitchens(data))
      .catch(err => {});
  }, []);

  const defaultImages = [
    "https://images.unsplash.com/photo-1498579150354-979478841054?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1599321955726-e04842668d52?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop"
  ];

  if (kitchens.length === 0) return null;

  return (
    <section>
      <h2 className="font-h2 text-h2 text-on-surface mb-6">Выбор по кухне</h2>
      <div className="flex gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
        {kitchens.map((kitchen, index) => (
          <Link
            key={kitchen.id}
            to={`/browse?kitchenId=${kitchen.id}`}
            className="flex flex-col items-center gap-3 group min-w-[100px]"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary-container transition-all shadow-sm">
              <img
                src={kitchen.image || defaultImages[index % defaultImages.length]}
                alt={kitchen.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="font-label-md text-on-surface group-hover:text-primary-container transition-colors text-center">
              {kitchen.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}