import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileSidebar() {
  const menuItems = [
    { path: '/profile/history', icon: 'history', label: 'История заказов' },
    { path: '/profile/favorites', icon: 'auto_awesome_motion', label: 'Избранные корзины' },
    { path: '/profile/fav-restaurants', icon: 'storefront', label: 'Любимые заведения' },
    { path: '/profile/cards', icon: 'credit_card', label: 'Сохраненные карты' },
    { path: '/profile/addresses', icon: 'location_on', label: 'Адреса доставки' },
    { path: '/profile/settings', icon: 'settings', label: 'Настройки' }
  ];

  const activeClass = "flex items-center gap-3 px-4 py-3 bg-primary-container/10 text-primary-container rounded-xl font-label-md transition-colors";
  const inactiveClass = "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container rounded-xl font-label-md transition-colors";

  const userStr = localStorage.getItem('vkusochka_user');
  const user = userStr ? JSON.parse(userStr) : { name: 'Гость' };

  return (
    <div className="w-full md:w-1/4 bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 h-fit flex flex-col gap-1 shadow-sm">
      <div className="p-3 border-b border-outline-variant/30 mb-3 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-h2 text-[20px] shadow-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-label-md text-on-surface leading-tight">{user.name}</h3>
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