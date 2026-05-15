import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

export default function OrderSummary({ subtotal, deliveryFee, serviceFee, total }) {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:w-[380px] shrink-0">
      <div className="bg-surface rounded-xl p-md border border-outline-variant/30 sticky top-[100px]">
        <h2 className="font-h2 text-h2 text-on-surface mb-md">Order Summary</h2>
        
        <div className="space-y-sm mb-lg">
          <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
            <span>Service Fee</span>
            <span>${serviceFee}</span>
          </div>
          
          <div className="pt-sm border-t border-outline-variant/30 mt-sm">
            <div className="flex justify-between font-h2 text-h2 text-on-surface">
              <span>Total</span>
              <span className="text-primary">${total}</span>
            </div>
          </div>
        </div>
        
        <Button className="w-full py-[16px]" onClick={() => navigate('/checkout')}>
          Proceed to Checkout
          <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
        
        <p className="font-label-sm text-label-sm text-center text-on-surface-variant mt-sm opacity-70">
          Taxes calculated at checkout
        </p>
      </div>
    </div>
  );
}