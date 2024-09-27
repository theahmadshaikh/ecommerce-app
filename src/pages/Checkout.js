// src/pages/Checkout.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button 
                className="text-red-500 hover:text-red-700" 
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-between font-bold">
        <span>Total:</span>
        <span>${getTotalPrice()}</span>
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
