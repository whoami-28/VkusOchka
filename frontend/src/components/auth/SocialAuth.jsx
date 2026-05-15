import React from 'react';
import Button from '../../ui/Button';

export default function SocialAuth() {
  return (
    <>
      <div className="relative flex items-center py-sm">
        <div className="flex-grow border-t border-outline-variant/50"></div>
        <span className="flex-shrink-0 mx-sm font-label-sm text-label-sm text-outline">ИЛИ ВОЙТИ ЧЕРЕЗ</span>
        <div className="flex-grow border-t border-outline-variant/50"></div>
      </div>
      
      <div className="flex flex-col gap-sm">
        <Button variant="secondary" className="w-full flex items-center justify-center gap-sm">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYr2FWNXtuNkbvo-jjB0W0AJG_k-ftU2x-vRcxmvs8B7WHnlnIYpmoPXkJQo2DV2j4PoXUf3piuri5i3ALN2mBd6flBloLVmd-tEeRJAKJFQfJDc-QJ90PF0AxUQzVC_v0C9iQxYFY6NsCxsr15hMmMkza9Eo0pNjLvvRaHBS0B6h_6qMUgAYcpK0ZY7yCOpnbGdq8qCA-OXBiWivOeZc4z39fG7LwjVh4DqSSCV_SqRu3E9e6AkP735amFAaf3Hso9yRXpPLwV0Y" 
            alt="Google" 
            className="w-5 h-5" 
          />
          Google
        </Button>
        
        <Button variant="secondary" className="w-full flex items-center justify-center gap-sm">
          <svg className="w-5 h-5 text-on-surface fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.365 14.363c0 1.636 1.05 2.652 1.346 2.923-1.042 1.547-2.128 3.092-3.834 3.125-1.636.033-2.164-1.002-4.004-1.002-1.84 0-2.434 1.002-3.971 1.034-1.57.034-2.825-1.696-3.87-3.226-2.128-3.124-3.766-8.835-1.57-12.723 1.077-1.908 2.997-3.125 5.127-3.158 1.636-.034 3.161 1.134 4.103 1.134.943 0 2.76-1.336 4.713-1.134 1.986.199 3.733 1.101 4.81 2.722-4.102 2.394-3.463 8.354.75 10.305zM12.915 4.364c.875-1.07 1.48-2.576 1.312-4.047-1.28.067-2.828.877-3.737 1.914-.808.908-1.48 2.441-1.278 3.912 1.447.134 2.828-.702 3.703-1.779z"></path>
          </svg>
          Apple
        </Button>
      </div>
    </>
  );
}