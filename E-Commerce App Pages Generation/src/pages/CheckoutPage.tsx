import { useState } from 'react';
import { Header } from '../components/Header';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, CreditCard, CheckCircle2, Plus } from 'lucide-react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type Step = 'address' | 'payment' | 'review';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, addresses, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState<Step>('address');
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id
  );
  const [paymentMethod, setPaymentMethod] = useState<string>('card');

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 20;
  const total = subtotal + shipping;

  const steps = [
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    if (currentStep === 'address') setCurrentStep('payment');
    else if (currentStep === 'payment') setCurrentStep('review');
  };

  const handlePlaceOrder = () => {
    clearCart();
    navigate('/order-confirmation');
  };

  const selectedAddressData = addresses.find((a) => a.id === selectedAddress);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Header title="Checkout" showBack showSearch={false} />

      {/* Progress Steps */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStepIndex;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isActive ? '#ec4899' : '#e5e7eb',
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}
                    />
                  </motion.div>
                  <span
                    className={`text-xs ${
                      isActive ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${
                      index < currentStepIndex ? 'bg-pink-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          {currentStep === 'address' && (
            <motion.div
              key="address"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Select Delivery Address</h3>
                <button
                  onClick={() => navigate('/addresses')}
                  className="text-pink-500 text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </button>
              </div>

              {addresses.map((address) => (
                <motion.div
                  key={address.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAddress(address.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedAddress === address.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-gray-900 mb-1">{address.name}</h4>
                      <p className="text-sm text-gray-600">{address.phone}</p>
                    </div>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {address.addressLine1}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                    <br />
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {currentStep === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-4"
            >
              <h3 className="text-gray-900 mb-4">Select Payment Method</h3>

              {[
                { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                { id: 'upi', label: 'UPI', icon: '📱' },
                { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
              ].map((method) => (
                <motion.div
                  key={method.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{method.icon}</span>
                    <span className="text-gray-900">{method.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {currentStep === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-4"
            >
              <h3 className="text-gray-900 mb-4">Order Summary</h3>

              <div className="bg-white rounded-2xl p-4 space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm text-gray-900 mb-1 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-pink-500">
                        ${item.product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedAddressData && (
                <div className="bg-white rounded-2xl p-4">
                  <h4 className="text-gray-900 mb-2">Delivery Address</h4>
                  <p className="text-sm text-gray-600">
                    {selectedAddressData.name}
                    <br />
                    {selectedAddressData.addressLine1}
                    {selectedAddressData.addressLine2 &&
                      `, ${selectedAddressData.addressLine2}`}
                    <br />
                    {selectedAddressData.city}, {selectedAddressData.state} -{' '}
                    {selectedAddressData.pincode}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Total Amount</span>
          <span className="text-2xl text-gray-900">${total.toFixed(2)}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={currentStep === 'review' ? handlePlaceOrder : handleNext}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg"
        >
          {currentStep === 'review' ? 'Place Order' : 'Continue'}
        </motion.button>
      </div>
    </div>
  );
}
