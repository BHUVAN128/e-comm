import { Search, Bell, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ title = 'Loveble', showSearch = true, showBack = false, onBack }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-white z-40 border-b border-gray-100">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {showBack ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onBack || (() => navigate(-1))}
                className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center"
              >
                <Menu className="w-5 h-5 text-white" />
              </motion.button>
            )}
            <div>
              <h1 className="text-gray-900">{title}</h1>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/notifications')}
            className="relative w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full" />
          </motion.button>
        </div>

        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/search')}
            className="relative cursor-pointer"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              readOnly
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
