import { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { products } from '../lib/mockData';

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating';
type ViewMode = 'grid' | 'list';

export function ProductsPage() {
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="All Products" showBack />

      <div className="sticky top-[73px] bg-white z-30 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-700" />
            <span className="text-sm text-gray-700">Filters</span>
          </motion.button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-700 border-0 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-xl ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-xl ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-700 mb-2">Price Range</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-700 mb-2">Rating</p>
                  <div className="flex gap-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className="px-3 py-1.5 bg-gray-50 rounded-lg text-sm hover:bg-pink-50 hover:text-pink-500 transition-colors"
                      >
                        {rating}+ ⭐
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-4 py-6">
        <p className="text-sm text-gray-500 mb-4">
          Showing {sortedProducts.length} products
        </p>

        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 gap-4'
              : 'space-y-4'
          }
        >
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
