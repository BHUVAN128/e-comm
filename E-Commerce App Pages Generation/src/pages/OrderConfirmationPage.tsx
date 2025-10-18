import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Package, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function OrderConfirmationPage() {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setConfetti(false), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      {confetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'linear',
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#ec4899', '#a855f7', '#6366f1', '#fbbf24'][
                  Math.floor(Math.random() * 4)
                ],
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-14 h-14 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl text-gray-900 mb-3"
        >
          Order Placed Successfully!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-2"
        >
          Thank you for your order
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-500 mb-8"
        >
          You will receive a confirmation email shortly
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-8"
        >
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl text-gray-900">ORD-2025-{Math.floor(Math.random() * 1000)}</p>
        </motion.div>

        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/orders')}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            <span>Track Order</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full py-4 border-2 border-pink-500 text-pink-500 rounded-xl flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
