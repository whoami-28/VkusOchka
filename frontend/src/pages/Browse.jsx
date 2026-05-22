import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Browse() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialKitchenId = searchParams.get('kitchenId') ? parseInt(searchParams.get('kitchenId')) : null;

    const [restaurants, setRestaurants] = useState([]);
    const [kitchens, setKitchens] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedKitchen, setSelectedKitchen] = useState(initialKitchenId);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    fetch('http://localhost:5147/api/kitchens')
        .then(res => res.json())
        .then(data => setKitchens(data))
        .catch(err => {});
    }, []);

    const handleKitchenSelect = (id) => {
    setSelectedKitchen(id);
    if (id) {
        setSearchParams({ kitchenId: id });
    } else {
        setSearchParams({});
    }
    };

    useEffect(() => {
    setIsLoading(true);
    let url = `http://localhost:5147/api/restaurants?search=${encodeURIComponent(searchQuery)}`;
    if (selectedKitchen) {
        url += `&kitchenId=${selectedKitchen}`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            setRestaurants(data);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
        });
    }, [searchQuery, selectedKitchen]);

    return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-lg md:py-xl pt-28">
        <div className="flex flex-col gap-6 mb-8">
        <h1 className="font-h1 text-[32px] md:text-[40px] text-on-surface leading-none">Все рестораны</h1>
        
        <div className="relative w-full max-w-2xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-tertiary">search</span>
            <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Название ресторана или блюда..."
            className="w-full bg-surface-container border border-outline-variant/50 rounded-2xl pl-12 pr-4 py-3.5 text-on-surface focus:outline-none focus:border-primary-container transition-colors shadow-sm"
            />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
            onClick={() => handleKitchenSelect(null)}
            className={`px-4 py-2 rounded-xl font-label-md border transition-all flex-shrink-0 ${!selectedKitchen ? 'bg-primary-container text-on-primary-container border-primary-container shadow-sm' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'}`}
            >
            Все кухни
            </button>
            {kitchens.map(kitchen => (
            <button
                key={kitchen.id}
                onClick={() => handleKitchenSelect(kitchen.id)}
                className={`px-4 py-2 rounded-xl font-label-md border transition-all flex-shrink-0 ${selectedKitchen === kitchen.id ? 'bg-primary-container text-on-primary-container border-primary-container shadow-sm' : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container'}`}
            >
                {kitchen.name}
            </button>
            ))}
        </div>
        </div>

        {isLoading ? (
        <div className="text-center py-12 text-on-surface-variant font-label-md">Поиск заведений...</div>
        ) : restaurants.length === 0 ? (
        <div className="text-center py-12 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6">
            <span className="material-symbols-outlined text-[48px] text-tertiary mb-2">search_off</span>
            <p className="font-body-md text-on-surface-variant">Ничего не найдено. Попробуйте изменить параметры фильтра.</p>
        </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {restaurants.map(restaurant => (
            <Link 
                key={restaurant.id} 
                to={`/restaurant/${restaurant.id}`} 
                className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-md transition-all flex flex-col group block"
            >
                <div className="h-48 w-full overflow-hidden relative bg-surface-container">
                <img src={restaurant.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuC3YozdwWIpl96e74z6iUVNJbG58cHp3qhqKQHpp5ex2Qpzd615rQS2JHsaviqTZ3FDit0ZvE0R8ZcW1seONu_b_JxmMRF9LQN6LXqfFBdP1gUDWJlKncvXKjJHV-KCGVfJ8ITvehCJoP-4_3PPfQdPIXKt0KLz2mVvB4IXpjxzEPXOIE2dZOC6swKkpf5ErxyaSMGUGYolmp5t-2Ec12uWeLw4c3FjNThhQ2SgwoGy24GNcGEFOYauziZmgDVC05U9wZVjsp3kusA"} alt={restaurant.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 right-3 bg-background rounded-full p-1.5 flex items-center justify-center text-on-surface-variant hover:text-primary-container shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                    </div>
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="mb-2">
                    <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-label-md text-[18px] text-on-surface leading-tight font-bold truncate">{restaurant.name}</h3>
                    <div className="flex items-center gap-1 bg-surface-container px-1.5 py-0.5 rounded text-on-surface text-xs flex-shrink-0">
                        <span>{restaurant.rating || "4.8"}</span>
                        <span className="material-symbols-outlined text-[12px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    </div>
                    <p className="font-body-md text-on-surface-variant text-sm line-clamp-2">{restaurant.description}</p>
                </div>
                </div>
            </Link>
            ))}
        </div>
        )}
    </div>
    );
}