import React, { useState } from 'react';

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState('visa');

  return (
    <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md">
      <h2 className="font-h2 text-h2 text-on-surface mb-md">Payment Method</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
        
        {/* Visa */}
        <label 
          className={`relative flex flex-col items-center justify-center p-sm rounded-lg cursor-pointer transition-all ${selectedMethod === 'visa' ? 'border-2 border-primary-container bg-secondary-container/10' : 'border border-outline-variant/30 hover:border-outline-variant'}`}
        >
          <input type="radio" name="payment" value="visa" className="sr-only" checked={selectedMethod === 'visa'} onChange={() => setSelectedMethod('visa')} />
          <span className="material-symbols-outlined text-[32px] text-on-surface mb-xs">credit_card</span>
          <span className="font-label-md text-label-md text-on-surface">•••• 4242</span>
          {selectedMethod === 'visa' && (
            <span className="absolute top-2 right-2 text-primary-container material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          )}
        </label>

        {/* Apple Pay */}
        <label 
          className={`relative flex flex-col items-center justify-center p-sm rounded-lg cursor-pointer transition-all ${selectedMethod === 'apple' ? 'border-2 border-primary-container bg-secondary-container/10' : 'border border-outline-variant/30 hover:border-outline-variant'}`}
        >
          <input type="radio" name="payment" value="apple" className="sr-only" checked={selectedMethod === 'apple'} onChange={() => setSelectedMethod('apple')} />
          <span className="material-symbols-outlined text-[32px] text-on-surface mb-xs">phone_iphone</span>
          <span className="font-label-md text-label-md text-on-surface">Apple Pay</span>
          {selectedMethod === 'apple' && (
            <span className="absolute top-2 right-2 text-primary-container material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          )}
        </label>

        {/* Cash */}
        <label 
          className={`relative flex flex-col items-center justify-center p-sm rounded-lg cursor-pointer transition-all ${selectedMethod === 'cash' ? 'border-2 border-primary-container bg-secondary-container/10' : 'border border-outline-variant/30 hover:border-outline-variant'}`}
        >
          <input type="radio" name="payment" value="cash" className="sr-only" checked={selectedMethod === 'cash'} onChange={() => setSelectedMethod('cash')} />
          <span className="material-symbols-outlined text-[32px] text-on-surface mb-xs">payments</span>
          <span className="font-label-md text-label-md text-on-surface">Cash on Delivery</span>
          {selectedMethod === 'cash' && (
            <span className="absolute top-2 right-2 text-primary-container material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          )}
        </label>

      </div>
    </section>
  );
}