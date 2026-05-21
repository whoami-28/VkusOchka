import React from 'react';
import { useCart } from '../../context/CartContext';

export default function PerfectPairings() {
  const { addToCart } = useCart();

  const pairings = [
    {
      id: 'pairing-1',
      name: 'Матча Латте',
      price: 4.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4lY5cAkL6e8o1DtqyErDzoVOAs122pbC0exAVLsXJokfr9stOfpphqoWPsr1iF31mveqY-K6wPV2mmMW7ae6G_IvpRiK8nqO1eEjIF8wQS7yXlmlrihF85004drkDUnO-XGcz5-9lOA0sSVEEeNP2hJaqDIuzSM71Yf8oxfsHFJ3t-6tf06sIejsDyp-XywZzFnc_KWj0xVEWz9oxNHSbuaWNgKEWztVYc8YRNqtUo_aZO1ywuEsYrx5CbVo9P0IyXH1ou2ePsmE'
    },
    {
      id: 'pairing-2',
      name: 'Сырный соус',
      price: 1.00,
      image: 'https://ferma-m2.ru/images/shop/recipe_image/crop_shutterstock_1009315681.jpg'
    },
    {
      id: 'pairing-3',
      name: 'Батат фри',
      price: 5.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCijleOSi3JlSa8tJFRUCAe9kpwyrhYRnNHTGrfLad8enJzCh59Ff6au-NaaZQGyKiWt5U22vhjsr24QmN_v8yqcfnESXr7MgtOYiyhI5-1RFxxQwaYOM2kMujo7f5Da8T5wHr1CyhLF48HY2vONnXR8olL9cqwiTRku94Azs3mo4Xtf5Q0mSuTH_OfxdGBVcgENwf8idTBxicmJZf4Wiah_KdS4fILFMTf5UM3NCIVzCKJxik7sOBCLBs5LLmTpvpjD2Fjx0PKDs8'
    }
  ];

  return (
    <section className="mt-xl border-t border-outline-variant pt-lg">
      <h2 className="font-h2 text-h2 text-on-surface mb-md">Идеально сочетается</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md">
        {pairings.map(item => (
          <div key={item.id} className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <h4 className="font-label-md text-on-surface mb-1">{item.name}</h4>
              <span className="font-label-md text-primary">${item.price.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => addToCart(item, 1, 'Дополнение')}
              className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}