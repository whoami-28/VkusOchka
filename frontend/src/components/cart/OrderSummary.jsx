import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { useCart } from '../../context/CartContext';

export default function OrderSummary() {
  const { getCartTotal } = useCart();
  
  const subtotal = getCartTotal();
  const deliveryFee = 2.99;
  const serviceFee = 1.50;
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 sticky top-28">
      <h2 className="font-h2 text-h2 text-on-surface mb-6">Ваш заказ</h2>
      
      <div className="flex flex-col gap-4 mb-6 border-b border-outline-variant/30 pb-6">
        <div className="flex justify-between font-body-md text-on-surface-variant">
          <span>Сумма заказа</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
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
        <Button className="w-full py-3">
          К оформлению
          <span className="material-symbols-outlined ml-2">arrow_forward</span>
        </Button>
      </Link>
    </div>
  );
}