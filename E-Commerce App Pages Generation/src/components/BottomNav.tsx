import { Home, LayoutGrid, ShoppingCart, Heart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useStore } from '../lib/store';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, wishlist } = useStore();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutGrid, label: 'Categories', path: '/categories' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: cart.length },
    { icon: Heart, label: 'Wishlist', path: '/wishlist', badge: wishlist.length },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all"
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive
                      ? 'text-pink-500'
                      : 'text-gray-500'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-xs transition-colors ${
                  isActive
                    ? 'text-pink-500'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
