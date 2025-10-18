import { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { EmptyState } from '../components/EmptyState';
import { motion, AnimatePresence } from 'motion/react';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { mockOrders } from '../lib/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (mockOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="My Orders" showBack showSearch={false} />
        <EmptyState
          icon={<Package className="w-16 h-16 text-pink-500" />}
          title="No orders yet"
          description="Start shopping and your orders will appear here"
          actionLabel="Start Shopping"
        />
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="My Orders" showBack showSearch={false} />

      <div className="px-4 py-6 space-y-4">
        {mockOrders.map((order, index) => {
          const isExpanded = expandedOrder === order.id;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">Order {order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>

                <div className="flex gap-3 mb-3">
                  {order.items.slice(0, 3).map((item) => (
                    <div
                      key={item.product.id}
                      className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100"
                    >
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-xl text-gray-900">${order.total}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setExpandedOrder(isExpanded ? null : order.id)
                    }
                    className="flex items-center gap-2 text-pink-500 text-sm"
                  >
                    <span>{isExpanded ? 'Hide' : 'View'} Details</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Items</p>
                        {order.items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center gap-3 py-2"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                              <ImageWithFallback
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm text-gray-900">
                              ${item.product.price}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Delivery Address
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.address.name}
                          <br />
                          {order.address.addressLine1}
                          {order.address.addressLine2 &&
                            `, ${order.address.addressLine2}`}
                          <br />
                          {order.address.city}, {order.address.state} -{' '}
                          {order.address.pincode}
                        </p>
                      </div>

                      {order.status !== 'cancelled' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl"
                        >
                          Track Order
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
