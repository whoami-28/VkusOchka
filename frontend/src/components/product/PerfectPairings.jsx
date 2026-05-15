import React from 'react';

const pairings = [
  { id: 1, name: 'Iced Green Tea', desc: 'Freshly brewed, unsweetened', price: '3.50', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBitnhNFiUBMpvek6kRmiJ4BbFinChb1qM1P1tIqXMnzVALDXsZHjI4yvVSCiSVm6LYoYKJrbS-k1tw3BkNMDEpe8mfBTwHV0a5gT_sH4wdM9WuK6Str_QN2ZvYouU31GMcUFSkrrcVTq8y0BwcnHkIbfxtdnt_HmN4-TGnHPV8xLAjOGzd0N6PAlo5CI1QJYEg2d_B4DSgVhfkDe0tArMVLFK1xRQEei-6HmPe-Fem8l5G3XHxnys88R0osx0tGQIq3KRa5NrQfts' },
  { id: 2, name: 'Extra Spiced Chickpeas', desc: 'Crunchy protein boost', price: '2.00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQgLtMs-AC0cK9zCIE7-N6GeGl0NLqE4Bjzj0sRVd8hoCPTk3AQDrhHNLZ4F6EuYUa33cn-uB2lbVzgw_fSxPIcpGXnC1uKZkbouHsgawqYDWeVl4XQzVdA3i2duFFUFvthYUtaC4AHbvC3fMjCQRQEqQpI6TWkGElbl43KdocFQV11j5GWK2zSCx4PhmVpOTfwj5x-t-Twe2rb6yyGFAj72-mQUNdkHRsqIEhiCnGY1qYo5TMGcg22rixdYzC690KWDsA4xTrcIM' },
  { id: 3, name: 'Vitality Juice', desc: 'Carrot, apple, ginger, turmeric', price: '6.50', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI0DLLA62sREfN5VQ5tZwwtx6w5j5N4DXelI8Xtgxi3c3vG4LFWJd1ONiPUWHZuwisyyO6H4Bn9m88qvISOxeIR_231AnPvNx1Gyyw1iLkFg7RvDZtzgsFPW53j3hCBNHKINrsELoB3_zAjrgCe5O6SjQqNeoRZgP3cR2qcPWbDm-41wc8kcffPoEMjomZGOQMUDA70ILh2JDDBqwmIeEIbhWltPnJFrZVS_BbjVntfNSzcM49qFpC8rbm8zEBi9Po95He8uXf2b0' }
];

export default function PerfectPairings() {
  return (
    <section className="max-w-7xl mx-auto w-full px-margin-mobile md:px-lg pb-xl">
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-h2 text-on-surface">Perfect Pairings</h2>
        <div className="flex gap-sm">
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-tertiary hover:bg-surface-container transition-colors disabled:opacity-50">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-tertiary hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
      <div className="flex gap-md overflow-x-auto pb-sm snap-x snap-mandatory scrollbar-hide">
        {pairings.map(item => (
          <div key={item.id} className="min-w-[240px] md:min-w-[280px] bg-surface-container-low rounded-xl border border-outline-variant/30 overflow-hidden snap-start flex flex-col cursor-pointer hover:shadow-sm transition-shadow">
            <div className="h-40 bg-surface-container-high relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <button className="absolute bottom-sm right-sm w-8 h-8 bg-surface rounded-full flex items-center justify-center shadow-sm text-primary hover:bg-surface-container">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
            <div className="p-sm flex flex-col flex-grow">
              <span className="font-label-md text-on-surface mb-xs">{item.name}</span>
              <span className="font-body-md text-on-surface-variant line-clamp-1 mb-sm flex-grow">{item.desc}</span>
              <span className="font-label-md text-primary-container">+${item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}