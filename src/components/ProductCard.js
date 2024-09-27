import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState('');

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setNotification('Product added to cart!');

    // Clear notification after 2 seconds
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center text-center">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{product.title}</h3>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-lg font-semibold mb-2">Price: ${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add to Cart
      </button>
      {notification && (
        <div className="mt-2 text-green-600">
          {notification}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
