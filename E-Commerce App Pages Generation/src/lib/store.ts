import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Address, User } from './types';
import { mockUser, mockAddresses } from './mockData';

interface AppStore {
  // User
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Addresses
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // User
      user: mockUser,
      isAuthenticated: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false, cart: [], wishlist: [] }),
      
      // Cart
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) =>
        set({ cart: get().cart.filter((item) => item.product.id !== productId) }),
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
        } else {
          set({
            cart: get().cart.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => set({ cart: [] }),
      
      // Wishlist
      wishlist: [],
      addToWishlist: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({ wishlist: [...get().wishlist, product] });
        }
      },
      removeFromWishlist: (productId) =>
        set({ wishlist: get().wishlist.filter((p) => p.id !== productId) }),
      isInWishlist: (productId) =>
        get().wishlist.some((p) => p.id === productId),
      
      // Addresses
      addresses: mockAddresses,
      addAddress: (address) =>
        set({ addresses: [...get().addresses, address] }),
      updateAddress: (address) =>
        set({
          addresses: get().addresses.map((a) =>
            a.id === address.id ? address : a
          ),
        }),
      deleteAddress: (addressId) =>
        set({ addresses: get().addresses.filter((a) => a.id !== addressId) }),
      setDefaultAddress: (addressId) =>
        set({
          addresses: get().addresses.map((a) => ({
            ...a,
            isDefault: a.id === addressId,
          })),
        }),
      
      // Theme
      isDarkMode: false,
      toggleTheme: () => set({ isDarkMode: !get().isDarkMode }),
    }),
    {
      name: 'loveble-store',
    }
  )
);
