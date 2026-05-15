import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

export default function AuthForm({ isLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="flex flex-col gap-gutter">
      {!isLogin && (
        <div className="flex flex-col gap-xs">
          <label htmlFor="name" className="font-label-sm text-label-sm text-on-surface-variant">Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="John Doe" 
            className="w-full bg-surface-container-lowest border border-outline-variant rounded focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all py-sm px-gutter font-body-md text-body-md text-on-surface placeholder:text-outline-variant h-[48px]" 
          />
        </div>
      )}

      <div className="flex flex-col gap-xs">
        <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface-variant">Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="name@example.com" 
          className="w-full bg-surface-container-lowest border border-outline-variant rounded focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all py-sm px-gutter font-body-md text-body-md text-on-surface placeholder:text-outline-variant h-[48px]" 
        />
      </div>

      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="font-label-sm text-label-sm text-on-surface-variant">Password</label>
          {isLogin && (
            <Link to="/forgot-password" className="font-label-sm text-label-sm text-primary-container hover:text-primary transition-colors">
              Forgot Password?
            </Link>
          )}
        </div>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            id="password" 
            placeholder="••••••••" 
            className="w-full bg-surface-container-lowest border border-outline-variant rounded focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all py-sm pl-gutter pr-lg font-body-md text-body-md text-on-surface placeholder:text-outline-variant h-[48px]" 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" style={showPassword ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full mt-sm">
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>
    </form>
  );
}