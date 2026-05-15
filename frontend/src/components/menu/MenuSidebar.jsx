import React from 'react';

export default function MenuSidebar() {
  return (
    <>
      <aside className="md:w-1/4 hidden md:block sticky top-28 h-fit">
        <h2 className="font-h2 text-h2 text-on-background mb-6">Категории</h2>
        <ul className="flex flex-col gap-sm">
          <li><a href="#starters" className="block py-2 font-label-md text-label-md text-primary font-bold border-l-4 border-primary-container pl-4 transition-all">Закуски</a></li>
          <li><a href="#mains" className="block py-2 font-body-md text-body-md text-tertiary hover:text-on-background pl-5 transition-all">Горячие блюда</a></li>
          <li><a href="#sides" className="block py-2 font-body-md text-body-md text-tertiary hover:text-on-background pl-5 transition-all">Гарниры</a></li>
          <li><a href="#desserts" className="block py-2 font-body-md text-body-md text-tertiary hover:text-on-background pl-5 transition-all">Десерты</a></li>
          <li><a href="#beverages" className="block py-2 font-body-md text-body-md text-tertiary hover:text-on-background pl-5 transition-all">Напитки</a></li>
        </ul>
      </aside>

      <div className="md:hidden overflow-x-auto whitespace-nowrap pb-4 border-b border-surface-variant flex gap-sm hide-scrollbar">
        <a href="#starters" className="px-4 py-2 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-full inline-block">Закуски</a>
        <a href="#mains" className="px-4 py-2 border border-outline-variant text-on-surface-variant font-label-sm text-label-sm rounded-full inline-block hover:bg-surface-container-low">Горячие блюда</a>
        <a href="#sides" className="px-4 py-2 border border-outline-variant text-on-surface-variant font-label-sm text-label-sm rounded-full inline-block hover:bg-surface-container-low">Гарниры</a>
      </div>
    </>
  );
}