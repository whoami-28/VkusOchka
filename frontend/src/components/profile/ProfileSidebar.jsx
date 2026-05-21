import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileSidebar() {
  const menuItems = [
    { path: '/profile/history', icon: 'history', label: 'История заказов' },
    { path: '/profile/favorites', icon: 'auto_awesome_motion', label: 'Избранные корзины' },
    { path: '/profile/cards', icon: 'credit_card', label: 'Сохраненные карты' },
    { path: '/profile/addresses', icon: 'location_on', label: 'Адреса доставки' },
    { path: '/profile/settings', icon: 'settings', label: 'Настройки' }
  ];

  const activeClass = "flex items-center gap-3 px-4 py-3 bg-primary-container/10 text-primary-container rounded-xl font-label-md transition-colors";
  const inactiveClass = "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container rounded-xl font-label-md transition-colors";

  return (
    <div className="w-full md:w-1/4 bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 h-fit flex flex-col gap-1 shadow-sm">
      <div className="p-3 border-b border-outline-variant/30 mb-3 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary-container overflow-hidden">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDIHj9vZQpeSaoOFWnQN18LytqeJWsx5fphPB_4_qE9eS7Yr2-1gwJmltB9gDBRiJfvkl58dGQq3S3L4xR_YurdgfpXwgwxIVu7MrEoWAlUCmO4K46vujBYu6MmUpP0oOXq2zoqJubVgSYPh5JpAtPSPvy2jnLsuFJddE98lzS-GPReSITRcW0tRmkBLt9PtiFkEynLgNZu66jbFMoKJO9DHf6nv9o5kUW0cPcyAbtX0WOIJ6laorj0N0mOHXlLCMOxOujYDxb7-c" alt="Аватар" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-label-md text-on-surface leading-tight">Дмитрий</h3>
          <span className="font-label-sm text-tertiary">Постоянный клиент</span>
        </div>
      </div>
      
      <nav className="flex flex-col gap-1">
        {menuItems.map(item => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}