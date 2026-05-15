import React, { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';
import SocialAuth from '../components/auth/SocialAuth';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-background min-h-screen relative flex flex-col font-body-md text-on-surface antialiased">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEIIpq376IzEVPDoGeQhlRwf1XPm6Y1hjkY0jFlSSlqkcq1SsR5PohJkKXBBe5ER-m1n6DFxX3Ncx3Z5Pic9wFGyX4tyclfqUG_O0d-cZnFBaAXTbP6VTg8sl4H5VppAknhTNOVjsLsB_QfIvNNzBgRffRXaK_6HNkAgRGXDgmLE3j9yGVfPIZ8feykjoqULZNN9g2Z5HDK1mr1mzre21krZJrBDBARyBz1hUUF6AyW_ZqpUFgHxF6cY0LW_kS-tuGt2NnLsWSJ2w" 
          alt="Фон" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-surface/40"></div>
      </div>

      <main className="relative z-10 flex-grow flex items-center justify-center p-margin-mobile md:p-md w-full max-w-7xl mx-auto">
        <div className="bg-surface/85 backdrop-blur-[12px] border border-outline-variant/20 w-full max-w-[480px] rounded-xl shadow-[0_8px_32px_rgba(40,40,39,0.08)] overflow-hidden flex flex-col">
          
          <div className="p-lg pb-md text-center">
            <h1 className="font-h1 text-h1 text-on-surface mb-xs">CulinaryCurated</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Ощутите вкус качества.</p>
          </div>

          <div className="flex border-b border-outline-variant/30 px-lg">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-sm font-label-md text-label-md transition-colors text-center border-b-2 ${isLogin ? 'text-primary border-primary' : 'text-on-surface-variant hover:text-on-surface border-transparent'}`}
            >
              Вход
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-sm font-label-md text-label-md transition-colors text-center border-b-2 ${!isLogin ? 'text-primary border-primary' : 'text-on-surface-variant hover:text-on-surface border-transparent'}`}
            >
              Регистрация
            </button>
          </div>

          <div className="p-lg flex flex-col gap-md">
            <AuthForm isLogin={isLogin} />
            <SocialAuth />
          </div>

          <div className="bg-surface-container-low p-md text-center border-t border-outline-variant/30">
            <p className="font-body-md text-body-md text-on-surface-variant">
              {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary-container font-label-md text-label-md hover:text-primary transition-colors">
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}