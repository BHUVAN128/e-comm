import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, TrendingUp, Zap, Tag, Sparkles, Gift } from 'lucide-react';
import { categories, products } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const banners = [
  {
    id: 1,
    title: 'Flash Sale',
    subtitle: 'Up to 50% OFF',
    description: 'On selected items this weekend',
    gradient: 'from-pink-500 via-purple-500 to-indigo-600',
    icon: Zap,
    buttonText: 'Shop Now',
    route: '/products',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh Collection',
    description: 'Discover the latest trends in fashion',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    icon: Sparkles,
    buttonText: 'Explore',
    route: '/products',
  },
  {
    id: 3,
    title: 'Special Offer',
    subtitle: 'Buy 2 Get 1 Free',
    description: 'On all electronics and accessories',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    icon: Tag,
    buttonText: 'Grab Deal',
    route: '/products',
  },
  {
    id: 4,
    title: 'Gift Cards',
    subtitle: 'Perfect Gift Idea',
    description: 'Available in multiple denominations',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
    icon: Gift,
    buttonText: 'Get Started',
    route: '/products',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const featuredProducts = products.slice(0, 6);
  const trendingProducts = products.slice(2, 6);

  // Auto-slide banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />

      <div className="px-4 py-6 space-y-8">
        {/* Hero Banner Carousel */}
        <div className="relative">
          <div className="relative h-48 rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              {banners.map((banner, index) => {
                if (index !== currentBanner) return null;
                const Icon = banner.icon;
                
                return (
                  <motion.div
                    key={banner.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} p-6 text-white`}
                  >
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 mb-2"
                      >
                        <Icon className="w-5 h-5 fill-current" />
                        <span className="text-sm">{banner.title}</span>
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl mb-2"
                      >
                        {banner.subtitle}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/90 mb-4"
                      >
                        {banner.description}
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(banner.route)}
                        className="self-start px-6 py-2 bg-white text-gray-900 rounded-xl flex items-center gap-2"
                      >
                        <span>{banner.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {banners.map((banner, index) => (
              <motion.button
                key={banner.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentBanner(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentBanner
                    ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-600'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Categories</h2>
            <button
              onClick={() => navigate('/categories')}
              className="text-pink-500 text-sm flex items-center gap-1"
            >
              <span>See All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {categories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/category/${category.id}`)}
                className="bg-white rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-900 mb-1">{category.name}</p>
                  <p className="text-xs text-gray-500">{category.productCount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-500" />
              <h2 className="text-gray-900">Trending Now</h2>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="text-pink-500 text-sm flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-40"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-900 line-clamp-2 mb-2">
                      {product.name}
                    </p>
                    <p className="text-pink-500">${product.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Featured Products</h2>
            <button
              onClick={() => navigate('/products')}
              className="text-pink-500 text-sm flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
