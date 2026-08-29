import { createContext, useContext, useState, useEffect, useOptimistic, startTransition, ReactNode } from 'react';
import { Product } from '../types/ecommerce';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlist: Product[];
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (product: Product) => void;
  totalWishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('eazykart-wishlist');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const { showToast } = useToast();

  // React 19 useOptimistic for instant bookmark updates
  const [optimisticWishlist, setOptimisticWishlist] = useOptimistic(
    wishlist,
    (state: Product[], updateProduct: Product) => {
      const exists = state.some((p) => p.id === updateProduct.id);
      if (exists) {
        return state.filter((p) => p.id !== updateProduct.id);
      }
      return [...state, updateProduct];
    }
  );

  useEffect(() => {
    localStorage.setItem('eazykart-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (id: string) => {
    return optimisticWishlist.some((p) => p.id === id);
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);

    startTransition(() => {
      setOptimisticWishlist(product);
      setWishlist((prev) => {
        if (exists) {
          showToast(`Removed "${product.name}" from Wishlist`, 'info');
          return prev.filter((p) => p.id !== product.id);
        } else {
          showToast(`Added "${product.name}" to Wishlist!`, 'success');
          return [...prev, product];
        }
      });
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: optimisticWishlist,
        isInWishlist,
        toggleWishlist,
        totalWishlistCount: optimisticWishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
