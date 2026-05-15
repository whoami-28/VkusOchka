import React from 'react';

export default function MenuSidebar() {
  return (
    <>
      {/* Десктопный сайдбар */}
      <aside className="md:w-1/4 hidden md:block sticky top-28 h-fit">
        <h2 className="font-h2 text-h2 text-on-background mb-6">Menu Categories</h2>
        <ul className="flex flex-col gap-sm">
          <li><a href="#starters" className="block py-2 font-label-md text-label-md text-primary font-bold border-l-4 border-primary-container pl-4 transition-all">Starters</a></li>
          <li><a href="#mains" className="block py-2 font-body-md text-body-md text-tertiary hover:text-on-background pl-5 transition-all">Main Courses</a></li>
          <li><a href="#sides" className="block py-2 font-body-md text-body-md text-tertiary hover:text-on-background pl-5 transition-all">Sides</a></li>
          <li><a href="#desserts" className="block py-2 font-body-md text-body-md text-tertiary hover:text-on-background pl-5 transition-all">Desserts</a></li>
          <li><a href="#beverages" className="block py-2 font-body-md text-body-md text-tertiary hover:text-on-background pl-5 transition-all">Beverages</a></li>
        </ul>
      </aside>

      {/* Мобильные табы */}
      <div className="md:hidden overflow-x-auto whitespace-nowrap pb-4 border-b border-surface-variant flex gap-sm hide-scrollbar">
        <a href="#starters" className="px-4 py-2 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full inline-block">Starters</a>
        <a href="#mains" className="px-4 py-2 border border-outline-variant text-on-surface-variant font-label-sm text-label-sm rounded-full inline-block hover:bg-surface-container-low">Main Courses</a>
        <a href="#sides" className="px-4 py-2 border border-outline-variant text-on-surface-variant font-label-sm text-label-sm rounded-full inline-block hover:bg-surface-container-low">Sides</a>
      </div>
    </>
  );
}