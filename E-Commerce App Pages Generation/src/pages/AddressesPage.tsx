import { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MapPin, Edit, Trash2, Check } from 'lucide-react';
import { useStore } from '../lib/store';
import { Address } from '../lib/types';
import { Dialog } from '../components/ui/dialog';

export function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useStore();
  const [showDialog, setShowDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        name: address.name,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || '',
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      });
    } else {
      setEditingAddress(null);
      setFormData({
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
      });
    }
    setShowDialog(true);
  };

  const handleSave = () => {
    if (editingAddress) {
      updateAddress({
        ...editingAddress,
        ...formData,
      });
    } else {
      addAddress({
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0,
      });
    }
    setShowDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="My Addresses" showBack showSearch={false} />

      <div className="px-4 py-6 space-y-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => handleOpenDialog()}
          className="w-full p-4 border-2 border-dashed border-pink-300 rounded-2xl flex items-center justify-center gap-2 text-pink-500 hover:bg-pink-50 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Address</span>
        </motion.button>

        {addresses.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-pink-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-gray-900">{address.name}</h3>
                  {address.isDefault && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                <p className="text-sm text-gray-600">
                  {address.addressLine1}
                  {address.addressLine2 && `, ${address.addressLine2}`}
                  <br />
                  {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              {!address.isDefault && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDefaultAddress(address.id)}
                  className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Set as Default</span>
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenDialog(address)}
                className="flex-1 py-2 px-3 bg-pink-50 text-pink-500 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-pink-100 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteAddress(address.id)}
                className="py-2 px-3 bg-red-50 text-red-500 rounded-lg text-sm flex items-center justify-center hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />

      {/* Address Form Dialog */}
      <AnimatePresence>
        {showDialog && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <h3 className="text-gray-900">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h3>
                <button
                  onClick={() => setShowDialog(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <span className="text-gray-600">✕</span>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Address Line 1</label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg"
                >
                  Save Address
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
