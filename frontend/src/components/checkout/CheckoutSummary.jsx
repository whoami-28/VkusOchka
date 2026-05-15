import React from 'react';
import Button from '../../ui/Button';

export default function CheckoutSummary() {
  return (
    <div className="sticky top-[120px] bg-surface-container border border-outline-variant/20 rounded-xl p-md flex flex-col gap-md">
      <h2 className="font-h2 text-h2 text-on-surface">Order Summary</h2>
      
      {/* Список товаров (сокращенный для чекаута) */}
      <div className="flex flex-col gap-sm border-b border-outline-variant/20 pb-md">
        <div className="flex justify-between items-start">
          <div className="flex gap-sm">
            <div className="font-label-md text-label-md bg-surface-container-highest text-on-surface w-6 h-6 flex items-center justify-center rounded">1</div>
            <div>
              <p className="font-label-md text-label-md text-on-surface">Truffle Risotto</p>
              <p className="font-body-md text-body-md text-tertiary text-sm">Extra parmesan</p>
            </div>
          </div>
          <p className="font-label-md text-label-md text-on-surface">$24.00</p>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex gap-sm">
            <div className="font-label-md text-label-md bg-surface-container-highest text-on-surface w-6 h-6 flex items-center justify-center rounded">2</div>
            <div>
              <p className="font-label-md text-label-md text-on-surface">Artisan Burrata</p>
            </div>
          </div>
          <p className="font-label-md text-label-md text-on-surface">$36.00</p>
        </div>
      </div>

      {/* Промокод */}
      <div className="flex gap-sm border-b border-outline-variant/20 pb-md">
        <input 
          type="text" 
          placeholder="Promo Code" 
          className="flex-grow bg-surface-container-lowest border border-tertiary/20 rounded-lg px-sm py-2 font-body-md text-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-colors placeholder:text-tertiary/50" 
        />
        <button className="bg-transparent border border-tertiary/50 text-on-surface font-label-md text-label-md px-sm rounded-lg hover:border-on-surface transition-colors">
          Apply
        </button>
      </div>

      {/* Итоговые суммы */}
      <div className="flex flex-col gap-xs font-body-md text-body-md text-on-surface-variant">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$60.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>$4.99</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes & Fees</span>
          <span>$5.85</span>
        </div>
      </div>

      {/* Полный итог */}
      <div className="flex justify-between items-center pt-sm border-t border-outline-variant/20">
        <span className="font-h2 text-h2 text-on-surface">Total</span>
        <span className="font-h2 text-h2 text-on-surface">$70.84</span>
      </div>

      <Button className="w-full rounded-full mt-sm">
        Place Order
        <span className="material-symbols-outlined">arrow_forward</span>
      </Button>
      
      <p className="text-center font-body-md text-[12px] text-tertiary mt-2">
        By placing your order, you agree to our Terms of Service.
      </p>
    </div>
  );
}