import React from 'react';
import DeliveryAddress from '../components/checkout/DeliveryAddress';
import PaymentMethod from '../components/checkout/PaymentMethod';
import CheckoutSummary from '../components/checkout/CheckoutSummary';

export default function Checkout() {
  return (
    <div className="bg-background text-on-background antialiased flex flex-col min-h-screen">
      <main className="flex-grow pt-[100px] pb-xl px-margin-mobile md:px-gutter max-w-7xl mx-auto w-full">
        <h1 className="font-h1 text-h1 text-on-surface mb-lg">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          {/* Левая колонка */}
          <div className="lg:col-span-8 flex flex-col gap-lg">
            <DeliveryAddress />
            <PaymentMethod />
          </div>
          
          {/* Правая колонка */}
          <div className="lg:col-span-4">
            <CheckoutSummary />
          </div>
        </div>
      </main>
    </div>
  );
}