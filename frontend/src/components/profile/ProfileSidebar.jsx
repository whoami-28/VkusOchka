import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileSidebar() {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-32 flex flex-col gap-sm">
        
        <div className="flex items-center gap-4 mb-6 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUPMnxk1Tshy7XgmRXhLw2TXH9WPncRlj-QCYWUcIa7euEPn_n8DtIEtOEzWNWBFkVSAbUOa1_dbg0Tewh-EMB-Sslqo9V3-m3nd25A2g6vcxczivAq9B86UDrJURxLP0LplUaGFgHiseChEiGSMcAnE5hAYkeIJbPCXkEvdIdgJ5nwHJjA8nms_dOZjXpLA3htwyC0JSzus_uVjnT1ZQFmFrIuDTI-OhIl1eeeDmY4o3ZYR_PAteE1n1FH24c9No-GcPCf5D4btQ" 
            alt="Julian Thorne" 
            className="w-12 h-12 rounded-full object-cover border border-outline-variant" 
          />
          <div>
            <h2 className="font-h2 text-on-surface text-lg">Julian Thorne</h2>
            <p className="font-body-md text-sm text-tertiary">Премиум аккаунт</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <Link to="/profile/history" className="flex items-center gap-3 p-3 rounded-lg bg-primary-container/10 text-on-primary-container font-label-md">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
            История заказов
          </Link>
          
          <Link to="/profile/cards" className="flex items-center gap-3 p-3 rounded-lg text-tertiary hover:bg-surface-container hover:text-on-surface transition-colors font-label-md">
            <span className="material-symbols-outlined">credit_card</span>
            Привязанные карты
          </Link>
          <Link to="/profile/addresses" className="flex items-center gap-3 p-3 rounded-lg text-tertiary hover:bg-surface-container hover:text-on-surface transition-colors font-label-md">
            <span className="material-symbols-outlined">location_on</span>
            Мои адреса
          </Link>
          <Link to="/profile/favorites" className="flex items-center gap-3 p-3 rounded-lg text-tertiary hover:bg-surface-container hover:text-on-surface transition-colors font-label-md">
            <span className="material-symbols-outlined">favorite</span>
            Избранное
          </Link>
          <Link to="/profile/settings" className="flex items-center gap-3 p-3 rounded-lg text-tertiary hover:bg-surface-container hover:text-on-surface transition-colors font-label-md">
            <span className="material-symbols-outlined">settings</span>
            Настройки
          </Link>
        </nav>
      </div>
    </aside>
  );
}