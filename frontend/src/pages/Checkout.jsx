import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import DeliveryAddress from '../components/checkout/DeliveryAddress';
import PaymentMethod from '../components/checkout/PaymentMethod';
import CheckoutSummary from '../components/checkout/CheckoutSummary';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart, discountPercent } = useCart();
  const navigate = useNavigate();
  const [paymentState, setPaymentState] = useState('idle');
  
  const [formData, setFormData] = useState({
    street: '',
    apartment: '',
    entrance: '',
    floor: '',
    intercom: '',
    comment: '',
    paymentMethod: 'card',
    selectedCardId: '1'
  });

  const subtotal = getCartTotal();
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = 2.99;
  const serviceFee = 1.50;
  const total = subtotal - discountAmount + deliveryFee + serviceFee;

  if (cartItems.length === 0 && paymentState === 'idle') {
    return (
      <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-xl pt-32 text-center">
        <h1 className="font-h1 text-[32px] text-on-surface mb-4">Оформление невозможно</h1>
        <p className="font-body-md text-on-surface-variant mb-8">Сначала добавьте блюда в корзину.</p>
        <Link to="/browse" className="text-primary-container hover:underline font-label-md">Вернуться в каталог</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.street) {
      alert('Пожалуйста, укажите улицу и дом');
      return;
    }

    const token = localStorage.getItem('vkusochka_token');
    if (!token) {
      alert('Пожалуйста, войдите в аккаунт для оформления заказа');
      navigate('/auth');
      return;
    }
    
    setPaymentState('processing');
    
    const orderPayload = {
      address: formData.street,
      total: total,
      items: cartItems.map(item => ({
        name: item.name + (item.note ? ` (${item.note})` : ''),
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const response = await fetch('http://localhost:5147/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании заказа');
      }

      setPaymentState('success');
      
      setTimeout(() => {
        clearCart();
        navigate('/profile/history', { replace: true });
      }, 2000);
      
    } catch (error) {
      alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
      setPaymentState('idle');
    }
  };

  return (
    <>
      {paymentState === 'processing' && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-outline-variant border-t-primary-container rounded-full animate-spin mb-6"></div>
          <h2 className="font-h1 text-[28px] text-on-surface mb-2">Обработка платежа</h2>
          <p className="font-body-md text-on-surface-variant">Связываемся с банком...</p>
        </div>
      )}

      {paymentState === 'success' && (
        <div className="fixed inset-0 bg-primary-container z-[100] flex flex-col items-center justify-center text-on-primary-container transition-opacity duration-500">
          <span className="material-symbols-outlined text-[96px] mb-6 animate-bounce">check_circle</span>
          <h2 className="font-h1 text-[36px] mb-2">Оплата прошла успешно!</h2>
          <p className="font-body-lg opacity-90">Заказ передан на кухню.</p>
        </div>
      )}

      <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-lg md:py-xl pt-28">
        <div className="flex items-center gap-xs text-tertiary font-label-md mb-md">
          <Link to="/cart" className="hover:text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Вернуться в корзину
          </Link>
        </div>

        <h1 className="font-h1 text-[32px] md:text-[40px] text-on-surface mb-lg">Оформление заказа</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-xl relative">
          <div className="lg:col-span-8 flex flex-col">
            <DeliveryAddress formData={formData} setFormData={setFormData} />
            <PaymentMethod formData={formData} setFormData={setFormData} />
          </div>
          
          <div className="lg:col-span-4">
            <CheckoutSummary 
              cartItems={cartItems}
              subtotal={subtotal}
              discountAmount={discountAmount}
              discountPercent={discountPercent}
              deliveryFee={deliveryFee}
              serviceFee={serviceFee}
              total={total}
              isSubmitting={paymentState !== 'idle'}
            />
          </div>
        </form>
      </div>
    </>
  );
}