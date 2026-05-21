import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

export default function Auth() {
  const [authType, setAuthType] = useState('login');

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-8 pb-6 text-center border-b border-outline-variant/30">
          <Link to="/" className="inline-block mb-4">
            <h1 className="font-h1 text-[32px] text-on-surface leading-none">Vkusochka</h1>
          </Link>
          <p className="font-body-md text-on-surface-variant">
            {authType === 'login' ? 'С возвращением! Войдите в аккаунт.' : 'Создайте аккаунт, чтобы продолжить.'}
          </p>
        </div>

        <div className="p-8">
          <div className="flex bg-surface-container rounded-xl p-1 mb-6">
            <button 
              onClick={() => setAuthType('login')}
              className={`flex-1 py-2 rounded-lg font-label-md transition-all ${authType === 'login' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Вход
            </button>
            <button 
              onClick={() => setAuthType('register')}
              className={`flex-1 py-2 rounded-lg font-label-md transition-all ${authType === 'register' ? 'bg-surface shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Регистрация
            </button>
          </div>

          <AuthForm type={authType} />
        </div>
      </div>
    </div>
  );
}