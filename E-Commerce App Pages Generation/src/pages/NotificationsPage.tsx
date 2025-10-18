import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Tag,
  Truck,
  Heart,
  Bell,
  ShoppingBag,
  Gift,
  TrendingUp,
  CheckCheck,
  Trash2,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'offer' | 'delivery' | 'wishlist' | 'general';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'delivery',
    title: 'Order Delivered Successfully',
    message: 'Your order #1234 has been delivered. Thank you for shopping with us!',
    time: '2 hours ago',
    read: false,
    actionUrl: '/orders',
  },
  {
    id: '2',
    type: 'offer',
    title: 'Flash Sale Alert! 🎉',
    message: 'Get up to 50% off on electronics. Limited time offer!',
    time: '5 hours ago',
    read: false,
    actionUrl: '/products',
  },
  {
    id: '3',
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order #1235 has been confirmed and is being processed.',
    time: '1 day ago',
    read: true,
    actionUrl: '/orders',
  },
  {
    id: '4',
    type: 'wishlist',
    title: 'Price Drop Alert',
    message: 'Wireless Headphones from your wishlist is now 20% off!',
    time: '1 day ago',
    read: true,
    actionUrl: '/wishlist',
  },
  {
    id: '5',
    type: 'delivery',
    title: 'Out for Delivery',
    message: 'Your order #1233 is out for delivery and will arrive today.',
    time: '2 days ago',
    read: true,
    actionUrl: '/orders',
  },
  {
    id: '6',
    type: 'general',
    title: 'Welcome to Loveble!',
    message: 'Thank you for joining us. Explore amazing deals and products.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '7',
    type: 'offer',
    title: 'Weekend Special',
    message: 'Extra 15% off on fashion items. Use code: WEEKEND15',
    time: '3 days ago',
    read: true,
    actionUrl: '/products',
  },
];

export function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-5 h-5" />;
      case 'offer':
        return <Tag className="w-5 h-5" />;
      case 'delivery':
        return <Truck className="w-5 h-5" />;
      case 'wishlist':
        return <Heart className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconBg = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100';
      case 'offer':
        return 'bg-pink-100';
      case 'delivery':
        return 'bg-green-100';
      case 'wishlist':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return 'text-blue-600';
      case 'offer':
        return 'text-pink-600';
      case 'delivery':
        return 'text-green-600';
      case 'wishlist':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </motion.button>
              <div>
                <h1 className="text-gray-900">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500">
                    {unreadCount} unread
                  </p>
                )}
              </div>
            </div>

            {unreadCount > 0 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={markAllAsRead}
                className="px-3 py-1.5 rounded-lg bg-pink-50 text-pink-600 text-sm flex items-center gap-1"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all read
              </motion.button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              All ({notifications.length})
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter('unread')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Unread ({unreadCount})
            </motion.button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4">
        {filteredNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500 text-sm text-center">
              {filter === 'unread'
                ? "You're all caught up!"
                : 'New notifications will appear here'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNotificationClick(notification)}
                    className={`bg-white rounded-2xl p-4 shadow-sm border cursor-pointer transition-all ${
                      notification.read
                        ? 'border-gray-100'
                        : 'border-pink-200 bg-pink-50/30'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl ${getIconBg(
                          notification.type
                        )} ${getIconColor(
                          notification.type
                        )} flex items-center justify-center flex-shrink-0`}
                      >
                        {getIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4
                            className={`${
                              notification.read
                                ? 'text-gray-900'
                                : 'text-gray-900'
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-pink-500 flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          {notification.actionUrl && (
                            <span className="text-xs text-pink-600">
                              View →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </motion.button>
                  </motion.div>

                  {/* Swipe to delete functionality for mobile */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center md:hidden"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Tips */}
      {notifications.length > 0 && (
        <div className="px-4 pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-100"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h4 className="text-gray-900 mb-1">Stay Updated!</h4>
                <p className="text-sm text-gray-600">
                  Enable push notifications to never miss out on exclusive deals
                  and order updates.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
