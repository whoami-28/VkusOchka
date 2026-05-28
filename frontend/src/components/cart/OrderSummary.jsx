import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { useCart } from '../../context/CartContext';

export default function OrderSummary() {
  const { getCartTotal, promoCode, discountPercent, applyPromo, removePromo } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const result = applyPromo(promoInput);
    setPromoMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) setPromoInput('');
    setTimeout(() => setPromoMessage({ text: '', type: '' }), 3000);
  };

  const subtotal = getCartTotal();
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = 2.99;
  const serviceFee = 1.50;
  const total = subtotal - discountAmount + deliveryFee + serviceFee;

  return (
    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 sticky top-28">
      <h2 className="font-h2 text-h2 text-on-surface mb-6">Ваш заказ</h2>
      
      <div className="mb-6">
        {!promoCode ? (
          <div className="flex gap-2">
            <input 
              type="text" 
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Промокод" 
              className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors uppercase font-label-md"
            />
            <Button onClick={handleApplyPromo} className="px-6 py-3">Ок</Button>
          </div>
        ) : (
          <div className="flex justify-between items-center bg-primary-container/10 border border-primary-container/30 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-primary-container">
              <span className="material-symbols-outlined text-[18px]">sell</span>
              <span className="font-label-md font-bold text-on-surface">Код {promoCode} применен</span>
            </div>
            <button onClick={removePromo} className="text-on-surface-variant hover:text-error transition-colors p-1">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        )}
        {promoMessage.text && (
          <p className={`text-sm mt-2 font-label-sm ${promoMessage.type === 'error' ? 'text-error' : 'text-primary-container'}`}>
            {promoMessage.text}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 mb-6 border-b border-outline-variant/30 pb-6">
        <div className="flex justify-between font-body-md text-on-surface-variant">
          <span>Сумма заказа</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between font-body-md text-primary-container font-bold">
            <span>Скидка ({discountPercent}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-body-md text-on-surface-variant">
          <span>Доставка</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-body-md text-on-surface-variant">
          <span>Сервисный сбор</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <span className="font-h1 text-[20px] text-on-surface">Итого</span>
        <span className="font-h1 text-[24px] text-primary-container">${total.toFixed(2)}</span>
      </div>
      
      <Link to="/checkout" className="block w-full">
        <Button className="w-full py-3 text-[16px]">
          К оформлению
          <span className="material-symbols-outlined ml-2">arrow_forward</span>
        </Button>
      </Link>
    </div>
  );
}