export type ProductCategory = 'all' | 'sofa' | 'chair' | 'mobile' | 'watch' | 'wireless';

export interface ProductVariant {
  name: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'sofa' | 'chair' | 'mobile' | 'watch' | 'wireless';
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  image: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  shortDesc: string;
  description: string;
  specifications: Record<string, string>;
  tags: string[];
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item id (productId + variant)
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  discount: number;
  discountCode: string | null;
  shippingCost: number;
  estimatedTax: number;
  grandTotal: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'APPLY_COUPON'; payload: { code: string } }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' };

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface FilterState {
  category: ProductCategory;
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  searchQuery: string;
  sortBy: SortOption;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  aptSuite?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'google_pay' | 'cod';
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  cvv?: string;
}

export interface OrderReceipt {
  orderId: string;
  orderDate: string;
  customer: CustomerDetails;
  items: CartItem[];
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  estimatedDelivery: string;
  trackingNumber: string;
}

export interface CheckoutActionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage?: string;
  order?: OrderReceipt;
}
