import {
  createContext,
  useContext,
  useState,
  useEffect,
  useActionState,
  useOptimistic,
  startTransition,
  ReactNode,
} from 'react';
import { CartItem, CartState, CartAction, Product } from '../types/ecommerce';
import { validCoupons } from '../data/products';
import { useToast } from './ToastContext';

const FREE_SHIPPING_THRESHOLD = 150;
const STANDARD_SHIPPING_FEE = 15;
const TAX_RATE = 0.08;

function calculateCart(state: {
  items: CartItem[];
  discountCode: string | null;
}): CartState {
  const items = state.items;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (state.discountCode && validCoupons[state.discountCode.toUpperCase()]) {
    const rate = validCoupons[state.discountCode.toUpperCase()].discountPercent / 100;
    discount = Math.round(subtotal * rate * 100) / 100;
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shippingCost = items.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const estimatedTax = items.length === 0 ? 0 : Math.round(discountedSubtotal * TAX_RATE * 100) / 100;
  const grandTotal = Math.round((discountedSubtotal + shippingCost + estimatedTax) * 100) / 100;

  return {
    items,
    totalQuantity,
    subtotal: Math.round(subtotal * 100) / 100,
    discount,
    discountCode: state.discountCode,
    shippingCost,
    estimatedTax,
    grandTotal,
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const payload = action.payload;
      const variantKey = `${payload.productId}-${payload.selectedColor || 'default'}-${payload.selectedSize || 'default'}`;
      const existingIndex = state.items.findIndex((item) => item.id === variantKey);
      const addQty = payload.quantity ?? 1;

      let nextItems: CartItem[];
      if (existingIndex > -1) {
        nextItems = state.items.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + addQty } : item
        );
      } else {
        const newItem: CartItem = {
          id: variantKey,
          productId: payload.productId,
          name: payload.name,
          price: payload.price,
          originalPrice: payload.originalPrice,
          image: payload.image,
          category: payload.category,
          selectedColor: payload.selectedColor,
          selectedSize: payload.selectedSize,
          quantity: addQty,
        };
        nextItems = [...state.items, newItem];
      }

      return calculateCart({ items: nextItems, discountCode: state.discountCode });
    }

    case 'REMOVE_ITEM': {
      const nextItems = state.items.filter((item) => item.id !== action.payload.id);
      return calculateCart({ items: nextItems, discountCode: state.discountCode });
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      let nextItems: CartItem[];
      if (quantity <= 0) {
        nextItems = state.items.filter((item) => item.id !== id);
      } else {
        nextItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }
      return calculateCart({ items: nextItems, discountCode: state.discountCode });
    }

    case 'APPLY_COUPON': {
      const code = action.payload.code.toUpperCase().trim();
      return calculateCart({ items: state.items, discountCode: code });
    }

    case 'REMOVE_COUPON': {
      return calculateCart({ items: state.items, discountCode: null });
    }

    case 'CLEAR_CART': {
      return calculateCart({ items: [], discountCode: null });
    }

    default:
      return state;
  }
}

const getInitialCartState = (): CartState => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('eazykart-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        return calculateCart({ items: parsed.items || [], discountCode: parsed.discountCode || null });
      }
    } catch {
      // fallback
    }
  }
  return calculateCart({ items: [], discountCode: null });
};

interface CartContextType {
  cart: CartState;
  isPending: boolean;
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;

  // Drawers & Modals
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Free shipping metrics
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [initialCart] = useState<CartState>(getInitialCartState);
  const { showToast } = useToast();

  // Drawer / modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // React 19 `useActionState` for Cart Actions (pure synchronous execution)
  const [cartState, dispatchCartAction, isPending] = useActionState(
    (prevState: CartState, action: CartAction): CartState => {
      return cartReducer(prevState, action);
    },
    initialCart
  );

  // React 19 `useOptimistic` for instant, non-blocking UI updates
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cartState,
    (currentState: CartState, action: CartAction) => {
      return cartReducer(currentState, action);
    }
  );

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(
      'eazykart-cart',
      JSON.stringify({
        items: cartState.items,
        discountCode: cartState.discountCode,
      })
    );
  }, [cartState]);

  const addItem = (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
    const action: CartAction = { type: 'ADD_ITEM', payload: item };
    startTransition(() => {
      setOptimisticCart(action);
      dispatchCartAction(action);
    });
    showToast(`Added ${item.name} to Cart`, 'success');
  };

  const removeItem = (id: string) => {
    const target = optimisticCart.items.find((i) => i.id === id);
    const action: CartAction = { type: 'REMOVE_ITEM', payload: { id } };
    startTransition(() => {
      setOptimisticCart(action);
      dispatchCartAction(action);
    });
    if (target) {
      showToast(`Removed "${target.name}" from Cart`, 'info');
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    const action: CartAction = { type: 'UPDATE_QUANTITY', payload: { id, quantity } };
    startTransition(() => {
      setOptimisticCart(action);
      dispatchCartAction(action);
    });
  };

  const applyCoupon = (code: string): boolean => {
    const normalized = code.toUpperCase().trim();
    if (validCoupons[normalized]) {
      const action: CartAction = { type: 'APPLY_COUPON', payload: { code: normalized } };
      startTransition(() => {
        setOptimisticCart(action);
        dispatchCartAction(action);
      });
      showToast(`Coupon "${normalized}" applied! ${validCoupons[normalized].discountPercent}% OFF`, 'success');
      return true;
    } else {
      showToast(`Invalid coupon code: "${code}"`, 'error', 'Try SAVE20, EAZY10, or FLASH30');
      return false;
    }
  };

  const removeCoupon = () => {
    const action: CartAction = { type: 'REMOVE_COUPON' };
    startTransition(() => {
      setOptimisticCart(action);
      dispatchCartAction(action);
    });
    showToast('Coupon code removed', 'info');
  };

  const clearCart = () => {
    const action: CartAction = { type: 'CLEAR_CART' };
    startTransition(() => {
      setOptimisticCart(action);
      dispatchCartAction(action);
    });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - optimisticCart.subtotal);
  const freeShippingProgress = Math.min(100, (optimisticCart.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        cart: optimisticCart,
        isPending,
        addItem,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,

        isCartOpen,
        openCart,
        closeCart,
        toggleCart,

        isCheckoutOpen,
        openCheckout,
        closeCheckout,

        quickViewProduct,
        openQuickView,
        closeQuickView,

        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
