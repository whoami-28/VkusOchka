import React from 'react';
import Button from '../../ui/Button';

export default function CheckoutSummary({ cartItems, subtotal, deliveryFee, serviceFee, total, isSubmitting }) {
  return (
    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 sticky top-28">
      <h2 className="font-h2 text-h2 text-on-surface mb-6">Ваш заказ</h2>
      
      <div className="flex flex-col gap-3 mb-6 border-b border-outline-variant/30 pb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start gap-4">
            <div className="flex gap-3">
              <span className="font-label-md text-primary-container">{item.quantity}x</span>
              <div className="flex flex-col">
                <span className="font-label-md text-on-surface line-clamp-1">{item.name}</span>
                {item.note && <span className="font-label-sm text-tertiary truncate max-w-[150px]">{item.note}</span>}
              </div>
            </div>
            <span className="font-label-md text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

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
        <span className="font-h1 text-[20px] text-on-surface">Итого к оплате</span>
        <span className="font-h1 text-[24px] text-primary-container">${total.toFixed(2)}</span>
      </div>
      
      <Button 
        type="submit" 
        className="w-full py-4 text-[16px]" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Обработка...' : 'Подтвердить заказ'}
      </Button>
      <p className="text-center font-label-sm text-tertiary mt-4">
        Нажимая кнопку, вы соглашаетесь с условиями обработки данных
      </p>
    </div>
  );
}