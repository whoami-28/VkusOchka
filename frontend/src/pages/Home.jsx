import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoryCarousel from '../components/home/CategoryCarousel';
import FeaturedNearby from '../components/home/FeaturedNearby';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto w-full px-margin-mobile md:px-6 py-lg flex flex-col gap-xl pt-24">
      <HeroBanner />
      <CategoryCarousel />
      <FeaturedNearby />
    </div>
  );
}