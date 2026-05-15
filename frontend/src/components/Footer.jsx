import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-100 dark:bg-zinc-900 border-t border-stone-200 dark:border-zinc-800 font-['Epilogue'] text-sm w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col gap-2 items-center md:items-start">
          <span className="text-lg font-bold text-stone-800 dark:text-stone-200">CulinaryCurated</span>
          <span className="text-stone-500 dark:text-stone-400">© {currentYear} CulinaryCurated. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/about" className="text-stone-500 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-300 underline-offset-4 hover:underline transition-all duration-200">About Us</Link>
          <Link to="/partner" className="text-stone-500 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-300 underline-offset-4 hover:underline transition-all duration-200">Partner with Us</Link>
          <Link to="/terms" className="text-stone-500 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-300 underline-offset-4 hover:underline transition-all duration-200">Terms of Service</Link>
          <Link to="/privacy" className="text-stone-500 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-300 underline-offset-4 hover:underline transition-all duration-200">Privacy Policy</Link>
          <Link to="/help" className="text-stone-500 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-300 underline-offset-4 hover:underline transition-all duration-200">Help Center</Link>
        </div>
      </div>
    </footer>
  );
}