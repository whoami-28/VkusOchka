import React from 'react';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';

export default function Cart() {
  // Тестовые данные для корзины (позже заменим на Redux/Zustand или API)
  const cartItems = [
    {
      id: 1,
      name: "Truffle Mushroom Risotto",
      price: "24.00",
      category: "Gourmet Italian",
      quantity: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKvwaul0G7SoHN5mWI3YLuODmLdgO-LkVRgKB5kbc09Gat8l3hkgDH4NAt6RcPruQ1vsl5On76qsK2ZMt8WOZ-Ep8S-UcVagZmkF7kyAK4NKmjOkUCQybT_xm2unHhFMb3YeqoVI8U1StV2-uvRGg-TSwfPCsPvGzfKRtlKLuPS_c_xnzcnKsv6r-CAb6jBQnb9V7HtYBVHLeM7VyjjDImdM3LYzC9SQdjQZzV1MU8c3Z1mTHgeOq68aN81QWYlCQ38z8VlpZUJz0"
    },
    {
      id: 2,
      name: "Artisan Wagyu Burger",
      price: "18.50",
      category: "The Burger Joint",
      note: "No onions, extra pickles",
      quantity: 2,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5vY6TW1TiYj9VQiKEgiHlNyA7RwE6-ZrHFsq2cYH3SNcozGlwpNxUksSArf3IZEnFGt0V0dJ1vUfW75KWZjBpcyA3YMXesaWTic25zGrzI4dM02mkN3yyvYUEP3UsbCbakVGQEicqYdJnxHUR-TMyjGpgAWeNZYQU5rvp26AK5XxURfdCtcgzfRXjYJIR7bsEwlNCWxmEOwTGztLYsH9pKjL7sYGxZwvFd_-y5M0DRO1kzRxG1lVSk7m-DlsVBeCEZfomJpACN60"
    }
  ];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md">
      
      <main className="flex-grow pt-[120px] pb-xl px-margin-mobile md:px-6 max-w-7xl mx-auto w-full">
        <h1 className="font-h1 text-h1 text-on-surface mb-lg">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-lg">
          {/* Левая колонка: Список товаров */}
          <div className="flex-1 space-y-md">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          {/* Правая колонка: Итог */}
          <OrderSummary 
            subtotal="61.00" 
            deliveryFee="4.99" 
            serviceFee="2.50" 
            total="68.49" 
          />
        </div>
      </main>
    </div>
  );
}