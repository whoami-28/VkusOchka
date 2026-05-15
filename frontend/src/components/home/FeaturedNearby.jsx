import React from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedNearby() {
  return (
    <section className="flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <h2 className="font-h2 text-h2 text-on-surface">Featured Nearby</h2>
        <Link to="/browse" className="font-label-md text-label-md text-primary-container hover:underline flex items-center gap-1">
          View All <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        <Link to="/restaurant/1" className="md:col-span-2 relative rounded-xl overflow-hidden group cursor-pointer border border-outline-variant/20 shadow-[0_4px_24px_rgba(40,40,39,0.04)] block">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMs2lzyoz89lpzIfWTlyjg8YY6ygNIEeL0GxlKiY1HL2WWm1deXiOhAdtaCAtAt0NazOWpc_vWO5aSeyWpTlN02xagzjKtY7rpwBo0YHihVjFmPOOivPpgn83kw6bBk3QXGEWjG0B_yOQF5jQoSVNCH-lkie0Ly8gnvNS1pOvLnCoxXj2DnHk0tLSjRhFlNUpZB6HYb1fSJOP3c1FYym18Fs_XSbG8yJzlbHuJ_Cl4VYMDoT1zlTxvdWGunlVBBzbYOOYVhIxm2-4" alt="Osteria Francescana" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          
          <div className="absolute top-4 right-4 bg-background rounded-full p-2 flex items-center justify-center text-on-surface-variant hover:text-primary-container transition-colors">
            <span className="material-symbols-outlined">favorite</span>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="flex gap-2 mb-2">
              <span className="bg-primary-container/90 backdrop-blur-sm text-white font-label-sm text-label-sm px-2 py-1 rounded">Promo</span>
              <span className="bg-surface/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm px-2 py-1 rounded flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span> 20-30 min
              </span>
            </div>
            <h3 className="font-h2 text-h2 mb-1">Osteria Francescana</h3>
            <p className="font-body-md text-body-md text-white/80 mb-2">Italian • Fine Dining • $$$</p>
            <div className="flex items-center gap-1 text-secondary-container">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-label-md text-label-md text-white">4.9 (500+ ratings)</span>
            </div>
          </div>
        </Link>

        <Link to="/restaurant/2" className="relative rounded-xl overflow-hidden group cursor-pointer border border-outline-variant/20 shadow-[0_4px_24px_rgba(40,40,39,0.04)] bg-surface flex flex-col block">
          <div className="h-[60%] w-full overflow-hidden relative">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3YozdwWIpl96e74z6iUVNJbG58cHp3qhqKQHpp5ex2Qpzd615rQS2JHsaviqTZ3FDit0ZvE0R8ZcW1seONu_b_JxmMRF9LQN6LXqfFBdP1gUDWJlKncvXKjJHV-KCGVfJ8ITvehCJoP-4_3PPfQdPIXKt0KLz2mVvB4IXpjxzEPXOIE2dZOC6swKkpf5ErxyaSMGUGYolmp5t-2Ec12uWeLw4c3FjNThhQ2SgwoGy24GNcGEFOYauziZmgDVC05U9wZVjsp3kusA" alt="Sushi Nakazawa" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute top-3 right-3 bg-background rounded-full p-1.5 flex items-center justify-center text-on-surface-variant hover:text-primary-container transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
            </div>
          </div>
          <div className="p-4 h-[40%] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-label-md text-label-md text-on-surface truncate pr-2">Sushi Nakazawa</h3>
                <div className="flex items-center gap-1 bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface">
                  <span className="font-label-sm text-label-sm">4.8</span>
                  <span className="material-symbols-outlined text-[12px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm truncate">Japanese • Sushi • $$</p>
            </div>
            <div className="flex items-center gap-3 text-on-surface-variant text-sm mt-2">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">local_shipping</span> $1.99</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 35-45 min</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}