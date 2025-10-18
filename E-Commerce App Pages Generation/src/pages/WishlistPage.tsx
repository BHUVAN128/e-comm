import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { EmptyState } from '../components/EmptyState';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useStore } from '../lib/store';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';

export function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleMoveToCart = (productId: string) => {
    const product = wishlist.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
      toast.success('Moved to cart!');
    }
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Wishlist" showSearch={false} />
        <EmptyState
          icon={<Heart className="w-16 h-16 text-pink-500" />}
          title="Your wishlist is empty"
          description="Save your favorite products and they will appear here"
          actionLabel="Discover Products"
        />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Wishlist" showSearch={false} />

      <div className="px-4 py-6">
        <p className="text-sm text-gray-500 mb-4">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
        </p>

        <div className="grid grid-cols-2 gap-4">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="relative aspect-square bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs">
                    {product.discount}% OFF
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </motion.button>
              </div>

              <div className="p-3">
                <h3
                  className="text-sm text-gray-900 mb-2 line-clamp-2 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-pink-500">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMoveToCart(product.id)}
                  className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Move to Cart</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
