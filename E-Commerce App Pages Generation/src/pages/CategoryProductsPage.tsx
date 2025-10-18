import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { categories, products } from '../lib/mockData';

type SortOption = 'default' | 'price-low' | 'price-high' | 'rating';

export function CategoryProductsPage() {
  const { id } = useParams();
  const category = categories.find((c) => c.id === id);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  if (!category) {
    return <div>Category not found</div>;
  }

  const categoryProducts = products.filter((p) => p.category === category.name);

  const sortedProducts = [...categoryProducts].sort((a, b) => {
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
      <Header title={category.name} showBack showSearch={false} />

      {/* Category Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-pink-500 to-purple-600 px-6 py-8 text-white"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
            {category.icon}
          </div>
          <div>
            <h2 className="text-2xl mb-1">{category.name}</h2>
            <p className="text-white/90">{category.productCount} products available</p>
          </div>
        </div>
      </motion.div>

      {/* Sort Options */}
      <div className="sticky top-[73px] bg-white z-30 px-4 py-3 border-b border-gray-100">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-700 border-0 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
        >
          <option value="default">Sort by: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="px-4 py-6">
        <p className="text-sm text-gray-500 mb-4">
          Showing {sortedProducts.length} products
        </p>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {sortedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found in this category</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
