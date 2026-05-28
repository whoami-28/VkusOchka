import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { useCart } from '../../context/CartContext';

export default function ProductInfo({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedBase, setSelectedBase] = useState('Без основы');

  const bases = ['Киноа', 'Бурый рис', 'Микс салатов', 'Гречка', 'Рис', 'Без основы'];

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const note = selectedBase !== 'Без основы' ? `Основа: ${selectedBase}` : '';
    addToCart(product, quantity, note);
  };

  const priceNum = Number(product.price) || 0;
  const totalPrice = (priceNum * quantity).toFixed(2);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center gap-xs text-tertiary font-label-md mb-sm">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface">Блюдо</span>
        </div>

        <h1 className="font-h1 text-on-surface mb-xs">{product.name}</h1>
        
        <div className="flex items-center justify-between mb-md">
          <span className="font-h2 text-primary-container">${priceNum.toFixed(2)}</span>
          <div className="flex items-center gap-xs text-tertiary font-label-sm">
            <span className="material-symbols-outlined text-[16px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span>{product.rating || "4.9"} ({product.reviews || "128"} отзывов)</span>
          </div>
        </div>

        <p className="font-body-md text-on-surface-variant mb-lg">{product.description}</p>

        <div className="mb-lg border-t border-outline-variant pt-md">
          <h3 className="font-label-md text-on-surface mb-sm">Выберите основу</h3>
          <div className="flex flex-wrap gap-sm">
            {bases.map((base) => (
              <button
                key={base}
                onClick={() => setSelectedBase(base)}
                className={`px-md py-sm rounded-lg border font-label-md transition-colors ${
                  selectedBase === base
                    ? 'border-2 border-primary-container bg-secondary-container/20 text-on-surface'
                    : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {base}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-lg grid grid-cols-4 gap-sm bg-surface-container-low p-md rounded-xl border border-outline-variant/30">
          <div className="flex flex-col items-center">
            <span className="font-h2 text-on-surface">{product.calories}</span>
            <span className="font-label-sm text-tertiary">ККАЛ</span>
          </div>
          <div className="flex flex-col items-center border-l border-outline-variant/30">
            <span className="font-h2 text-on-surface">{product.protein}g</span>
            <span className="font-label-sm text-tertiary">БЕЛ</span>
          </div>
          <div className="flex flex-col items-center border-l border-outline-variant/30">
            <span className="font-h2 text-on-surface">{product.carbs}g</span>
            <span className="font-label-sm text-tertiary">УГЛ</span>
          </div>
          <div className="flex flex-col items-center border-l border-outline-variant/30">
            <span className="font-h2 text-on-surface">{product.fat}g</span>
            <span className="font-label-sm text-tertiary">ЖИР</span>
          </div>
        </div>
      </div>

      <div className="mt-auto bg-surface py-md border-t border-outline-variant/30 md:border-none sticky bottom-0 z-40 md:static flex flex-col gap-sm">
        <div className="flex items-center gap-md mb-sm md:mb-0">
          <div className="flex items-center border border-outline-variant rounded-lg h-12">
            <button onClick={handleDecrement} className="px-sm h-full flex items-center justify-center text-tertiary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="font-label-md text-on-surface w-8 text-center">{quantity}</span>
            <button onClick={handleIncrement} className="px-sm h-full flex items-center justify-center text-tertiary hover:text-primary transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <Button className="flex-grow shadow-sm" onClick={handleAddToCart}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
            Добавить к заказу - ${totalPrice}
          </Button>
        </div>
        <div className="text-center font-label-sm text-tertiary">
          Примерное время приготовления: 10-15 мин
        </div>
      </div>
    </div>
  );
}