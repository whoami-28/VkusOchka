import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import PerfectPairings from '../components/product/PerfectPairings';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5147/api/dishes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сервера');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div className="p-md text-center text-on-surface pt-32">Загрузка блюда...</div>;
  }

  if (error || !product) {
    return (
      <div className="p-md text-center text-error border border-error/20 rounded-xl bg-error/5 my-md mt-32 max-w-7xl mx-auto">
        Не удалось загрузить информацию о блюде.
      </div>
    );
  }

  const productData = {
    id: product.id,
    name: product.name,
    price: product.price,
    rating: "4.9",
    reviews: "128",
    description: product.description,
    calories: product.calories || 0,
    protein: product.protein || 0,
    carbs: product.carbs || 0,
    fat: product.fat || 0,
    mainImage: product.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDSLCgtR3sOKEvei80z9MMpJOPy6A8T0A6qB2HXoUKk5jdW_mIq3Q5Opa0GV6jMbcFRY5wnoOkTKU9Qk64gjNYBqvWyfc8hU6zJrjTrGvRdqt6-SFEr0OdfrEwEUfrP71V4YcJ5012tQ8GmNrj6n0dU5kKa-jf_QNRAUCJY4uOBqNipOf0tm9NEp9eSqWIaw3m50SLr7WoU3GZfGnRIj5UrcFwHNTfJ_kEUh3RoL8KHqjFrzPSDxKsmrj8AV_koJcOWN5T0bx9lv2g",
    thumbnails: [
      product.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDSLCgtR3sOKEvei80z9MMpJOPy6A8T0A6qB2HXoUKk5jdW_mIq3Q5Opa0GV6jMbcFRY5wnoOkTKU9Qk64gjNYBqvWyfc8hU6zJrjTrGvRdqt6-SFEr0OdfrEwEUfrP71V4YcJ5012tQ8GmNrj6n0dU5kKa-jf_QNRAUCJY4uOBqNipOf0tm9NEp9eSqWIaw3m50SLr7WoU3GZfGnRIj5UrcFwHNTfJ_kEUh3RoL8KHqjFrzPSDxKsmrj8AV_koJcOWN5T0bx9lv2g",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4lY5cAkL6e8o1DtqyErDzoVOAs122pbC0exAVLsXJokfr9stOfpphqoWPsr1iF31mveqY-K6wPV2mmMW7ae6G_IvpRiK8nqO1eEjIF8wQS7yXlmlrihF85004drkDUnO-XGcz5-9lOA0sSVEEeNP2hJaqDIuzSM71Yf8oxfsHFJ3t-6tf06sIejsDyp-XywZzFnc_KWj0xVEWz9oxNHSbuaWNgKEWztVYc8YRNqtUo_aZO1ywuEsYrx5CbVo9P0IyXH1ou2ePsmE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCijleOSi3JlSa8tJFRUCAe9kpwyrhYRnNHTGrfLad8enJzCh59Ff6au-NaaZQGyKiWt5U22vhjsr24QmN_v8yqcfnESXr7MgtOYiyhI5-1RFxxQwaYOM2kMujo7f5Da8T5wHr1CyhLF48HY2vONnXR8olL9cqwiTRku94Azs3mo4Xtf5Q0mSuTH_OfxdGBVcgENwf8idTBxicmJZf4Wiah_KdS4fILFMTf5UM3NCIVzCKJxik7sOBCLBs5LLmTpvpjD2Fjx0PKDs8"
    ]
  };

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-margin-mobile md:px-lg py-lg md:py-xl flex flex-col gap-lg md:gap-xl pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg md:gap-xl">
        <div className="lg:col-span-7">
          <ProductGallery 
            mainImage={productData.mainImage} 
            thumbnails={productData.thumbnails} 
          />
        </div>
        
        <div className="lg:col-span-5">
          <ProductInfo product={productData} />
        </div>
      </div>
      
      <PerfectPairings />
    </div>
  );
}