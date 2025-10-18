import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { EmptyState } from '../components/EmptyState';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import { useStore } from '../lib/store';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

export function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 20;
  const discount = subtotal > 300 ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    toast.success('Removed from cart');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Shopping Cart" showSearch={false} />
        <EmptyState
          icon={<ShoppingBag className="w-16 h-16 text-pink-500" />}
          title="Your cart is empty"
          description="Add some products to your cart and they will show up here"
          actionLabel="Start Shopping"
          onAction={() => navigate('/products')}
        />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-48">
      <Header title="Shopping Cart" showSearch={false} />

      <div className="px-4 py-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {cart.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 mb-1 line-clamp-2">
                    {item.product.name}
                  </h3>
                  <p className="text-pink-500 mb-3">${item.product.price}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-md bg-white flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </motion.button>
                      <span className="text-sm text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.min(item.product.stock, item.quantity + 1)
                          )
                        }
                        className="w-8 h-8 rounded-md bg-white flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                      </motion.button>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemove(item.product.id)}
                      className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Promo Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pink-50 flex items-center justify-center">
              <Tag className="w-5 h-5 text-pink-500" />
            </div>
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1 bg-transparent border-0 focus:outline-none text-gray-900 placeholder:text-gray-400"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm">
              Apply
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount (10%)</span>
              <span className="text-green-600">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-gray-900">Total</span>
            <span className="text-xl text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/checkout')}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg"
        >
          Proceed to Checkout
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
