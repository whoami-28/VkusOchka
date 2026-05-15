import React from 'react';

export default function HeroBanner() {
  return (
    <section className="relative w-full rounded-xl overflow-hidden shadow-sm h-[400px] flex items-center bg-surface-container-high">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDljrbMGfQ7te4CFOjUDZo0S5wRwsoUNYeCSasfZSGTU5SRi9LN3BQ_jFUtCtO25qW33gWZNCOL4ZKVpC6i8ENkwkdwZjVhKhhJ3Ii8jMPX5gnV7zPPq-NCeXPu9zUOE6b_F5QUWsU6hYhPMk8o13pJi_dHaqKprV5lSKFmf16RN_3kLXajYhYjiz6cBRgIrMtb9b0czM4HIklXj6LT0tjiwlHfpZga3kwMwGBVmR42DgRjfWSjhe1jYZ11Wy95658YH-b4tXY_HRk" 
          alt="Hero background" 
          className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>
      <div className="relative z-10 w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-6">
        <span className="inline-block bg-primary-container text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full w-max uppercase tracking-wider">
          Limited Time
        </span>
        <h1 className="font-h1 text-h1 text-on-surface">Experience Culinary Excellence at 50% Off.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
          Discover curated menus from top local chefs. Elevate your dining experience tonight with our exclusive half-price offer on selected premium meals.
        </p>
        <button className="bg-primary-container text-on-primary font-label-md text-label-md px-8 py-4 rounded-lg w-max hover:opacity-90 transition-opacity flex items-center gap-2">
          Claim Offer
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}