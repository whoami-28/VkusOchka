import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

export default function AuthForm({ type }) {
  const isLogin = type === 'login';
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
    setFormData({ name: '', email: '', password: '' });
  }, [type]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin) {
      const cleanName = formData.name.trim();
      if (cleanName.length < 2 || cleanName.length > 50) {
        setError('Имя должно содержать от 2 до 50 символов');
        return;
      }
      if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(cleanName)) {
        setError('Имя может содержать только буквы, пробел или дефис');
        return;
      }
      if (cleanName.includes('--') || cleanName.includes('  ') || /(.)\1{3,}/.test(cleanName)) {
        setError('Имя содержит недопустимые символы или повторения');
        return;
      }
    }

    setIsLoading(true);
    const endpoint = isLogin ? 'http://localhost:5147/api/auth/login' : 'http://localhost:5147/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('vkusochka_token', data.token);
        localStorage.setItem('vkusochka_user', JSON.stringify(data.user));
        navigate('/', { replace: true });
        window.location.reload();
      } else {
        setError(data.message || 'Произошла ошибка');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {!isLogin && (
        <div>
          <label className="font-label-sm text-tertiary mb-1 block">Как к вам обращаться?</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Иван Иванов" 
            maxLength="50"
            className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors" 
            required 
          />
        </div>
      )}
      <div>
        <label className="font-label-sm text-tertiary mb-1 block">Электронная почта</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="example@mail.com" 
          maxLength="100"
          className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors" 
          required 
        />
      </div>
      <div>
        <label className="font-label-sm text-tertiary mb-1 block">Пароль</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="••••••••" 
          maxLength="100"
          className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors" 
          required 
        />
      </div>

      {error && <p className="text-error font-label-sm text-sm">{error}</p>}

      <Button type="submit" className="w-full py-4 text-[16px] mt-2" disabled={isLoading}>
        {isLoading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Создать аккаунт')}
      </Button>
    </form>
  );
}