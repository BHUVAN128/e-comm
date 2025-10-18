import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { motion } from 'motion/react';
import {
  User,
  Heart,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Edit,
} from 'lucide-react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useStore();

  if (!user) {
    return null;
  }

  const menuItems = [
    {
      icon: ShoppingBag,
      label: 'My Orders',
      path: '/orders',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      label: 'Wishlist',
      path: '/wishlist',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: MapPin,
      label: 'Addresses',
      path: '/addresses',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      color: 'from-gray-500 to-slate-600',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Profile" showSearch={false} />

      <div className="px-4 py-6 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-6 text-white"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-white/30 overflow-hidden bg-white/10">
              <ImageWithFallback
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-1">{user.name}</h2>
              <p className="text-white/80 text-sm mb-1">{user.email}</p>
              <p className="text-white/80 text-sm">{user.phone}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Edit className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Orders', value: '12' },
              { label: 'Wishlist', value: '8' },
              { label: 'Reviews', value: '24' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center"
              >
                <p className="text-2xl mb-1">{stat.value}</p>
                <p className="text-xs text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="flex-1 text-gray-900">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            );
          })}
        </div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl p-4 flex items-center justify-center gap-3 text-red-500 hover:shadow-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
