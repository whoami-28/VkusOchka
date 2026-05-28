import React, { useState, useEffect } from 'react';
import Button from '../../ui/Button';

export default function PaymentMethod({ formData, setFormData }) {
  const [savedCards, setSavedCards] = useState([]);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

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

  const getCardBrand = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]|^2[2-7]/.test(cleanNumber)) return 'Mastercard';
    if (/^220[0-4]/.test(cleanNumber)) return 'МИР';
    return 'Card';
  };

  const validateLuhn = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (!/^\d+$/.test(cleanNumber)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i));
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateCardForm = () => {
    const newErrors = {};
    const cleanNumber = newCard.number.replace(/\s/g, '');

    if (cleanNumber.length !== 16) {
      newErrors.number = 'Номер карты должен состоять из 16 цифр';
    } else if (!validateLuhn(cleanNumber)) {
      newErrors.number = 'Неверный номер карты (проверка Луна отклонена)';
    }

    if (!/^\d{2}\/\d{2}$/.test(newCard.expiry)) {
      newErrors.expiry = 'Формат должен быть ММ/ГГ';
    } else {
      const [month, year] = newCard.expiry.split('/').map(num => parseInt(num, 10));
      if (month < 1 || month > 12) {
        newErrors.expiry = 'Некорректный месяц (01-12)';
      } else {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = parseInt(now.getFullYear().toString().slice(-2), 10);
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiry = 'Срок действия карты истёк';
        } else if (year > currentYear + 20) {
          newErrors.expiry = 'Некорректный год';
        }
      }
    }

    if (!/^\d{3}$/.test(newCard.cvv)) {
      newErrors.cvv = 'CVV должен состоять из 3 цифр';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setNewCard(prev => ({ ...prev, number: formatted }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setNewCard(prev => ({ ...prev, expiry: value }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setNewCard(prev => ({ ...prev, cvv: value }));
  };

  const handleAddCard = () => {
    if (!validateCardForm()) return;

    const brand = getCardBrand(newCard.number);
    const last4 = newCard.number.replace(/\s/g, '').slice(-4);
    const newId = Date.now().toString();
    
    const updatedCards = [...savedCards, { id: newId, last4, brand }];
    setSavedCards(updatedCards);
    localStorage.setItem('vkusochka_cards', JSON.stringify(updatedCards));
    setFormData(prev => ({ ...prev, paymentMethod: 'card', selectedCardId: newId }));
    setIsAddCardOpen(false);
    setNewCard({ number: '', expiry: '', cvv: '' });
    setErrors({});
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
                          <span className="font-body-md text-on-surface">{card.brand} • • • • {card.last4}</span>
                        </div>
                        {formData.selectedCardId === card.id && (
                          <span className="material-symbols-outlined text-primary-container text-[20px]">check_circle</span>
                        )}
                      </div>
                    ))}
                    
                    <button 
                      type="button"
                      onClick={() => { setIsAddCardOpen(true); setErrors({}); }}
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
                <div className="flex justify-between items-center mb-1">
                  <label className="font-label-sm text-tertiary block">Номер карты</label>
                  {newCard.number && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-primary-container/20 text-primary-container rounded">
                      {getCardBrand(newCard.number)}
                    </span>
                  )}
                </div>
                <input 
                  type="text" 
                  maxLength="19"
                  value={newCard.number}
                  onChange={handleNumberChange}
                  placeholder="0000 0000 0000 0000"
                  className={`w-full bg-background border rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors tracking-widest font-mono ${errors.number ? 'border-error' : 'border-outline-variant/50'}`}
                />
                {errors.number && <p className="text-error text-xs mt-1 font-label-sm">{errors.number}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-tertiary mb-1 block">Срок действия</label>
                  <input 
                    type="text" 
                    maxLength="5"
                    value={newCard.expiry}
                    onChange={handleExpiryChange}
                    placeholder="ММ/ГГ"
                    className={`w-full bg-background border rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors font-mono ${errors.expiry ? 'border-error' : 'border-outline-variant/50'}`}
                  />
                  {errors.expiry && <p className="text-error text-xs mt-1 font-label-sm">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="font-label-sm text-tertiary mb-1 block">CVV</label>
                  <input 
                    type="password" 
                    maxLength="3"
                    value={newCard.cvv}
                    onChange={handleCvvChange}
                    placeholder="•••"
                    className={`w-full bg-background border rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors font-mono tracking-widest ${errors.cvv ? 'border-error' : 'border-outline-variant/50'}`}
                  />
                  {errors.cvv && <p className="text-error text-xs mt-1 font-label-sm">{errors.cvv}</p>}
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