import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

export default function AuthForm({ type }) {
  const navigate = useNavigate();
  const isLogin = type === 'login';
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const url = isLogin 
      ? 'http://localhost:5147/api/auth/login' 
      : 'http://localhost:5147/api/auth/register';

    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data || 'Ошибка авторизации');
      }

      if (!isLogin) {
        const loginResponse = await fetch('http://localhost:5147/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        const loginData = await loginResponse.json();
        if (loginResponse.ok) {
          localStorage.setItem('vkusochka_token', loginData.token);
          localStorage.setItem('vkusochka_user', JSON.stringify(loginData.user));
          navigate('/profile/history', { replace: true });
        }
      } else {
        localStorage.setItem('vkusochka_token', data.token);
        localStorage.setItem('vkusochka_user', JSON.stringify(data.user));
        navigate('/profile/history', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-error/10 text-error p-3 rounded-xl font-body-md text-sm">
          {error}
        </div>
      )}
      {!isLogin && (
        <div>
          <label className="font-label-sm text-tertiary mb-1 block">Имя</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
            required
          />
        </div>
      )}
      <div>
        <label className="font-label-sm text-tertiary mb-1 block">Email</label>
        <input 
          type="email" 
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
          required
        />
      </div>
      <div>
        <label className="font-label-sm text-tertiary mb-1 block">Пароль</label>
        <input 
          type="password" 
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
          required
        />
      </div>
      <Button type="submit" className="w-full mt-2 py-3" disabled={isLoading}>
        {isLoading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
      </Button>
    </form>
  );
}