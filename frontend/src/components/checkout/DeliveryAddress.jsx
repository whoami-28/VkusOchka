import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from '../../ui/Button';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapClickHandler({ setPosition, setAddress, setIsLoading }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setIsLoading(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        if (data && data.address) {
          const street = data.address.road || data.address.pedestrian || data.address.suburb || '';
          const house = data.address.house_number || '';
          const fullStreet = street ? `${street}${house ? ', ' + house : ''}` : 'Адрес не определен';
          setAddress(fullStreet);
        }
      } catch (error) {
        setAddress('Ошибка определения адреса');
      } finally {
        setIsLoading(false);
      }
    },
  });
  return null;
}

export default function DeliveryAddress({ formData, setFormData }) {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapPosition, setMapPosition] = useState([55.7558, 37.6173]);
  const [tempAddress, setTempAddress] = useState('Кликните на карту для выбора адреса');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [saveToProfile, setSaveToProfile] = useState(true);

  useEffect(() => {
    const localAddrs = localStorage.getItem('vkusochka_addresses');
    if (localAddrs) {
      setSavedAddresses(JSON.parse(localAddrs));
    } else {
      const defaultAddrs = [
        { id: 1, type: 'Дом', text: 'Ленинградский проспект, 39с79, кв. 45' },
        { id: 2, type: 'Работа', text: 'ул. Пушкина, д. 10, офис 404' }
      ];
      localStorage.setItem('vkusochka_addresses', JSON.stringify(defaultAddrs));
      setSavedAddresses(defaultAddrs);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectSaved = (addr) => {
    setFormData(prev => ({ ...prev, street: addr.text }));
  };

  const handleConfirmMap = () => {
    if (tempAddress !== 'Кликните на карту для выбора адреса' && tempAddress !== 'Ошибка определения адреса' && tempAddress !== 'Адрес не определен') {
      setFormData(prev => ({ ...prev, street: tempAddress }));
      
      if (saveToProfile) {
        const newAddr = {
          id: Date.now(),
          type: 'Карта',
          text: tempAddress
        };
        const updated = [...savedAddresses, newAddr];
        setSavedAddresses(updated);
        localStorage.setItem('vkusochka_addresses', JSON.stringify(updated));
      }
    }
    setIsMapOpen(false);
  };

  return (
    <>
      <section className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 mb-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-h2 text-h2 text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">location_on</span>
            Адрес доставки
          </h2>
          <button 
            type="button"
            onClick={() => setIsMapOpen(true)}
            className="flex items-center gap-1 font-label-md text-primary-container hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            Выбрать на карте
          </button>
        </div>

        {savedAddresses.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-outline-variant/20 scrollbar-hide">
            {savedAddresses.map(addr => (
              <button
                key={addr.id}
                type="button"
                onClick={() => handleSelectSaved(addr)}
                className={`px-4 py-2 rounded-xl border text-sm transition-all flex-shrink-0 ${formData.street === addr.text ? 'bg-primary-container text-on-primary-container border-primary-container shadow-sm' : 'bg-surface text-on-surface-variant border-outline-variant/50 hover:bg-surface-container'}`}
              >
                {addr.type}: {addr.text.split(',')[0]}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-label-sm text-tertiary mb-1 block">Улица и дом *</label>
            <input 
              type="text" 
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="ул. Пушкина, д. 10"
              className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="font-label-sm text-tertiary mb-1 block">Квартира</label>
              <input 
                type="text" 
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
              />
            </div>
            <div>
              <label className="font-label-sm text-tertiary mb-1 block">Подъезд</label>
              <input 
                type="text" 
                name="entrance"
                value={formData.entrance}
                onChange={handleChange}
                className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
              />
            </div>
            <div>
              <label className="font-label-sm text-tertiary mb-1 block">Этаж</label>
              <input 
                type="text" 
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
              />
            </div>
            <div>
              <label className="font-label-sm text-tertiary mb-1 block">Домофон</label>
              <input 
                type="text" 
                name="intercom"
                value={formData.intercom}
                onChange={handleChange}
                className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="font-label-sm text-tertiary mb-1 block">Комментарий курьеру</label>
            <textarea 
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Например: оставьте у двери, не звоните в звонок..."
              rows="2"
              className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors resize-none"
            ></textarea>
          </div>
        </div>
      </section>

      {isMapOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMapOpen(false)}></div>
          <div className="bg-surface w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden relative z-10 flex flex-col shadow-2xl animate-fade-in">
            <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface">
              <h2 className="font-h2 text-h2 text-on-surface">Укажите точку на карте</h2>
              <button type="button" onClick={() => setIsMapOpen(false)} className="p-2 text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-grow relative z-0">
              <MapContainer center={mapPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition} />
                <MapClickHandler setPosition={setMapPosition} setAddress={setTempAddress} setIsLoading={setIsLoadingAddress} />
              </MapContainer>
            </div>
            <div className="p-6 bg-surface flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex-grow">
                <span className="font-label-sm text-tertiary block mb-1">Выбранный адрес:</span>
                <span className="font-h2 text-on-surface block min-h-[28px]">
                  {isLoadingAddress ? 'Определяем...' : tempAddress}
                </span>
                <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={saveToProfile}
                    onChange={(e) => setSaveToProfile(e.target.checked)}
                    className="rounded border-outline-variant text-primary-container focus:ring-primary-container"
                  />
                  <span className="font-label-sm text-on-surface-variant">Сохранить этот адрес в профиле</span>
                </label>
              </div>
              <Button type="button" onClick={handleConfirmMap} className="w-full md:w-auto px-8 flex-shrink-0">
                Подтвердить
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}