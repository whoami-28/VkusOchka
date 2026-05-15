import React from 'react';

export default function RestaurantHero() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px]">
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf1v9_OEsCcN6Xp4Srp1m84n0XtTQSqg4f12KEob3FpkkMWYw7aFYlGXP-8xs0prvPh1_Xb_aBLEQUhO6SsKDMp3yGVwU_dKlWHG-DbEtbDlvpiTgcXlYAM3GZaO230SOBPqbzOkFYvQcuZekQCXi_dIkW2RncqU4byPdPporvg5YUWfVdutgWXyifR8FMky34cV2A11OE2Bo6Xc-Psp1hO5lnzYxieghBnQ3kt55X_xC9B2BmpLMqrAUdVZ9f8V1u4aoVV7vmMH0" 
        alt="The Golden Harvest Restaurant" 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 max-w-7xl mx-auto">
        <h1 className="font-h1 text-h1 text-white mb-2">The Golden Harvest</h1>
        <div className="flex flex-wrap items-center gap-4 text-white font-body-md text-body-md opacity-90">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 
            4.8 (500+ ratings)
          </span>
          <span className="w-1 h-1 bg-white rounded-full"></span>
          <span>Farm-to-Table, American</span>
          <span className="w-1 h-1 bg-white rounded-full"></span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined">schedule</span> 30-45 min
          </span>
        </div>
      </div>
    </section>
  );
}