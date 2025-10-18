import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { motion } from 'motion/react';
import { categories } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

export function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Categories" showSearch={false} />

      <div className="px-4 py-6">
        <p className="text-sm text-gray-500 mb-6">
          Browse products by category
        </p>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/category/${category.id}`)}
              className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group"
            >
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="text-white mb-1">{category.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80">
                    {category.productCount} items
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
