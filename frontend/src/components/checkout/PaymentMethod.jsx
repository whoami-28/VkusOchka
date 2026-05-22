import React, { useState, useEffect } from 'react';
import Button from '../../ui/Button';

export default function PaymentMethod({ formData, setFormData }) {
  const [savedCards, setSavedCards] = useState([]);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '' });

  useEffect(() => {
    const localCards = localStorage.getItem('vkusochka_cards');
    if (localCards) {
      setSavedCards(JSON.parse(localCards));
    } else {
      const defaultCards = [
        { id: '1', last4: '4242', brand: 'Visa' },
        { id: '2', last4: '8888', brand: 'Mastercard' }
      ];
      localStorage.setItem('vkusochka_cards', JSON.stringify(defaultCards));
      setSavedCards(defaultCards);
    }
  }, []);

  const handleAddCard = () => {
    if (newCard.number.length < 16) {
      alert("Некорректный номер карты");
      return;
    }
    const brand = newCard.number[0] === '4' ? 'Visa' : 'Mastercard';
    const last4 = newCard.number.slice(-4);
    const newId = Date.now().toString();
    
    const updatedCards = [...savedCards, { id: newId, last4, brand }];
    setSavedCards(updatedCards);
    localStorage.setItem('vkusochka_cards', JSON.stringify(updatedCards));
    setFormData(prev => ({ ...prev, paymentMethod: 'card', selectedCardId: newId }));
    setIsAddCardOpen(false);
    setNewCard({ number: '', expiry: '', cvv: '' });
  };

  return (
    <>
      <section className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 mb-6">
        <h2 className="font-h2 text-h2 text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container">payment</span>
          Способ оплаты
        </h2>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-primary-container bg-primary-container/10' : 'border-outline-variant/50 bg-surface hover:bg-surface-container'}`}>
              <div className="w-5 h-5 rounded-full border-2 border-primary-container flex items-center justify-center mt-1">
                {formData.paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-primary-container rounded-full"></div>}
              </div>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="card" 
                checked={formData.paymentMethod === 'card'}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                className="hidden" 
              />
              <div className="flex flex-col w-full">
                <span className="font-label-md text-on-surface mb-3">Онлайн оплата картой</span>
                
                {formData.paymentMethod === 'card' && (
                  <div className="flex flex-col gap-3 w-full">
                    {savedCards.map(card => (
                      <div 
                        key={card.id}
                        onClick={() => setFormData(prev => ({ ...prev, selectedCardId: card.id }))}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${formData.selectedCardId === card.id ? 'border-primary-container bg-background shadow-sm' : 'border-outline-variant/30 bg-surface/50 hover:border-outline-variant'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-tertiary">credit_card</span>
                          <span className="font-body-md text-on-surface">• • • • {card.last4}</span>
                        </div>
                        {formData.selectedCardId === card.id && (
                          <span className="material-symbols-outlined text-primary-container text-[20px]">check_circle</span>
                        )}
                      </div>
                    ))}
                    
                    <button 
                      type="button"
                      onClick={() => setIsAddCardOpen(true)}
                      className="flex items-center gap-2 p-3 rounded-lg border border-dashed border-outline-variant/70 text-on-surface-variant hover:text-primary-container hover:border-primary-container transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                      <span className="font-label-md">Добавить новую карту</span>
                    </button>
                  </div>
                )}
              </div>
            </label>
          </div>

          <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'cash' ? 'border-primary-container bg-primary-container/10' : 'border-outline-variant/50 bg-surface hover:bg-surface-container'}`}>
            <div className="w-5 h-5 rounded-full border-2 border-primary-container flex items-center justify-center">
              {formData.paymentMethod === 'cash' && <div className="w-2.5 h-2.5 bg-primary-container rounded-full"></div>}
            </div>
            <input 
              type="radio" 
              name="paymentMethod" 
              value="cash" 
              checked={formData.paymentMethod === 'cash'}
              onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
              className="hidden" 
            />
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface">Наличными или картой курьеру</span>
              <span className="font-label-sm text-tertiary">Оплата при получении заказа</span>
            </div>
          </label>
        </div>
      </section>

      {isAddCardOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddCardOpen(false)}></div>
          <div className="bg-surface w-full max-w-md rounded-3xl p-6 relative z-10 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-h2 text-h2 text-on-surface">Добавление карты</h3>
              <button type="button" onClick={() => setIsAddCardOpen(false)} className="text-tertiary hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="font-label-sm text-tertiary mb-1 block">Номер карты</label>
                <input 
                  type="text" 
                  maxLength="16"
                  value={newCard.number}
                  onChange={(e) => setNewCard(prev => ({ ...prev, number: e.target.value.replace(/\D/g, '') }))}
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-background border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors tracking-widest font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-tertiary mb-1 block">Срок действия</label>
                  <input 
                    type="text" 
                    maxLength="5"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                    placeholder="MM/YY"
                    className="w-full bg-background border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-tertiary mb-1 block">CVV</label>
                  <input 
                    type="password" 
                    maxLength="3"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                    placeholder="•••"
                    className="w-full bg-background border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors font-mono tracking-widest"
                  />
                </div>
              </div>
              <Button type="button" onClick={handleAddCard} className="w-full mt-4 py-3">
                Сохранить карту
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}