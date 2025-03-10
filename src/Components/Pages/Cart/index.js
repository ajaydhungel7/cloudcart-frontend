// frontend/src/components/Cart.jsx
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CartContext } from '../context/cart.jsx';

export default function Cart({ showModal, toggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  return (
    showModal && (
      <div className="fixed inset-0 flex flex-col items-center bg-white p-10 shadow-lg z-50">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="absolute top-10 right-16">
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none"
            onClick={toggle}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center w-full">
              <div className="flex gap-4 items-center">
                <img src={item.thumbnail} alt={item.title} className="rounded-md h-24" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{item.title}</h1>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none"
                  onClick={() => removeFromCart(item)}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 ? (
          <div className="flex flex-col items-center mt-6">
            <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
            <button
              className="mt-4 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none"
              onClick={clearCart}
            >
              Clear cart
            </button>
          </div>
        ) : (
          <h1 className="text-lg font-bold mt-6">Your cart is empty</h1>
        )}
      </div>
    )
  );
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func
};
