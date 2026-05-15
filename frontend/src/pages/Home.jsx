import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroBanner from '../components/home/HeroBanner';
import CategoryCarousel from '../components/home/CategoryCarousel';
import FeaturedNearby from '../components/home/FeaturedNearby';

export default function Home() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased pt-20 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-6 py-lg flex flex-col gap-xl">
        <HeroBanner />
        <CategoryCarousel />
        <FeaturedNearby />
      </main>
      <Footer />
    </div>
  );
}