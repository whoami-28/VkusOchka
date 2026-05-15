import React from 'react';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import PerfectPairings from '../components/product/PerfectPairings';

export default function ProductDetails() {
  const productData = {
    name: "Harvest Buddha Bowl",
    price: "14.95",
    rating: "4.9",
    reviews: "128",
    description: "A nourishing blend of roasted sweet potatoes, massaged kale, tricolor quinoa, and spiced chickpeas, topped with a creamy lemon-tahini dressing and a sprinkle of toasted pumpkin seeds. Perfect for a fulfilling, wholesome lunch.",
    mainImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSLCgtR3sOKEvei80z9MMpJOPy6A8T0A6qB2HXoUKk5jdW_mIq3Q5Opa0GV6jMbcFRY5wnoOkTKU9Qk64gjNYBqvWyfc8hU6zJrjTrGvRdqt6-SFEr0OdfrEwEUfrP71V4YcJ5012tQ8GmNrj6n0dU5kKa-jf_QNRAUCJY4uOBqNipOf0tm9NEp9eSqWIaw3m50SLr7WoU3GZfGnRIj5UrcFwHNTfJ_kEUh3RoL8KHqjFrzPSDxKsmrj8AV_koJcOWN5T0bx9lv2g",
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4lY5cAkL6e8o1DtqyErDzoVOAs122pbC0exAVLsXJokfr9stOfpphqoWPsr1iF31mveqY-K6wPV2mmMW7ae6G_IvpRiK8nqO1eEjIF8wQS7yXlmlrihF85004drkDUnO-XGcz5-9lOA0sSVEEeNP2hJaqDIuzSM71Yf8oxfsHFJ3t-6tf06sIejsDyp-XywZzFnc_KWj0xVEWz9oxNHSbuaWNgKEWztVYc8YRNqtUo_aZO1ywuEsYrx5CbVo9P0IyXH1ou2ePsmE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCijleOSi3JlSa8tJFRUCAe9kpwyrhYRnNHTGrfLad8enJzCh59Ff6au-NaaZQGyKiWt5U22vhjsr24QmN_v8yqcfnESXr7MgtOYiyhI5-1RFxxQwaYOM2kMujo7f5Da8T5wHr1CyhLF48HY2vONnXR8olL9cqwiTRku94Azs3mo4Xtf5Q0mSuTH_OfxdGBVcgENwf8idTBxicmJZf4Wiah_KdS4fILFMTf5UM3NCIVzCKJxik7sOBCLBs5LLmTpvpjD2Fjx0PKDs8"
    ]
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col pt-20">
      <main className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-lg md:py-xl grid grid-cols-1 lg:grid-cols-12 gap-lg md:gap-xl">
        <div className="lg:col-span-7">
          <ProductGallery 
            mainImage={productData.mainImage} 
            thumbnails={productData.thumbnails} 
          />
        </div>
        
        <div className="lg:col-span-5">
          <ProductInfo product={productData} />
        </div>
      </main>

      <PerfectPairings />
    </div>
  );
}