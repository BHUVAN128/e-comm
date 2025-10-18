import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingCart, Star, Minus, Plus, Share2, ArrowLeft, Info, Package } from 'lucide-react';
import { products } from '../lib/mockData';
import { useStore } from '../lib/store';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BottomNav } from '../components/BottomNav';
import { ProductCard } from '../components/ProductCard';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  
  if (!product) {
    return <div>Product not found</div>;
  }

  const inWishlist = isInWishlist(product.id);
  const images = product.images || [product.image];
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg z-40 px-4 py-4 flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </motion.button>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 text-gray-700" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleWishlistToggle}
            className={`w-10 h-10 rounded-xl shadow-sm flex items-center justify-center ${
              inWishlist
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="aspect-square bg-gray-50 relative overflow-hidden"
        >
          <ImageWithFallback
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full">
              <span>{product.discount}% OFF</span>
            </div>
          )}
        </motion.div>

        {images.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {images.map((image, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${
                  selectedImage === index
                    ? 'border-pink-500'
                    : 'border-gray-200'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="bg-white mt-2 p-6 space-y-6">
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h1 className="text-2xl text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-900">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
                <span className="text-green-600">
                  Save ${product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className={`px-3 py-1 rounded-lg ${
              product.stock > 20
                ? 'bg-green-50 text-green-700'
                : product.stock > 0
                ? 'bg-amber-50 text-amber-700'
                : 'bg-red-50 text-red-700'
            }`}>
              <span className="text-sm">
                {product.stock > 20
                  ? 'In Stock'
                  : product.stock > 0
                  ? `Only ${product.stock} left`
                  : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Brand */}
        {product.brand && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <span>Brand:</span>
              <span className="text-gray-900">{product.brand}</span>
            </div>
          </div>
        )}

        {/* Color Selector */}
        {product.colors && product.colors.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-gray-900 mb-3">Select Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <motion.button
                  key={color}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-xl border-2 transition-all ${
                    selectedColor === color
                      ? 'border-pink-500 bg-pink-50 text-pink-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {color}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-gray-900 mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-xl border-2 transition-all ${
                    selectedSize === size
                      ? 'border-pink-500 bg-pink-50 text-pink-600'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Product Attributes/Specifications */}
        {product.attributes && product.attributes.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-pink-500" />
              <h3 className="text-gray-900">Specifications</h3>
            </div>
            <div className="space-y-3">
              {product.attributes.map((attr, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-600">{attr.label}</span>
                  <span className="text-gray-900 text-right max-w-[60%]">
                    {attr.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div>
          <h3 className="text-gray-900 mb-3">Quantity</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-white flex items-center justify-center"
              >
                <Minus className="w-4 h-4 text-gray-700" />
              </motion.button>
              <span className="text-lg text-gray-900 w-12 text-center">{quantity}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 rounded-lg bg-white flex items-center justify-center"
              >
                <Plus className="w-4 h-4 text-gray-700" />
              </motion.button>
            </div>
            <span className="text-sm text-gray-500">Available: {product.stock}</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="p-6 bg-white mt-2">
          <h3 className="text-gray-900 mb-4">You May Also Like</h3>
          <div className="grid grid-cols-2 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 py-4 border-2 border-pink-500 text-pink-500 rounded-xl flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBuyNow}
            className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg"
          >
            Buy Now
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
