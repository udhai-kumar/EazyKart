import { Product, ProductCategory } from '../types/ecommerce';
import { mockProducts } from '../data/products';

// Cached Promises for React 19 `use(promise)` resource loading
let catalogPromiseCache: Promise<Product[]> | null = null;
const productDetailPromiseCache = new Map<string, Promise<Product | null>>();

/**
 * Fetch complete product catalog with promise caching for React 19 `use(promise)`
 */
export function fetchProductCatalog(): Promise<Product[]> {
  if (!catalogPromiseCache) {
    catalogPromiseCache = Promise.resolve([...mockProducts]);
  }
  return catalogPromiseCache;
}

/**
 * Fetch single product by ID with promise caching for React 19 `use(promise)`
 */
export function fetchProductById(id: string): Promise<Product | null> {
  if (!productDetailPromiseCache.has(id)) {
    const found = mockProducts.find((p) => p.id === id) || null;
    const promise = Promise.resolve(found);
    productDetailPromiseCache.set(id, promise);
  }
  return productDetailPromiseCache.get(id)!;
}

/**
 * Synchronously or asynchronously query filtered products
 */
export function getFilteredProducts(options: {
  category?: ProductCategory;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}): Product[] {
  let list = [...mockProducts];

  if (options.category && options.category !== 'all') {
    list = list.filter((p) => p.category === options.category);
  }

  if (options.searchQuery && options.searchQuery.trim().length > 0) {
    const q = options.searchQuery.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (options.minPrice !== undefined) {
    list = list.filter((p) => p.price >= options.minPrice!);
  }

  if (options.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= options.maxPrice!);
  }

  if (options.minRating !== undefined && options.minRating > 0) {
    list = list.filter((p) => p.rating >= options.minRating!);
  }

  if (options.inStockOnly) {
    list = list.filter((p) => p.inStock && p.stockCount > 0);
  }

  if (options.onSaleOnly) {
    list = list.filter((p) => (p.discountPercent ?? 0) > 0);
  }

  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a) => (a.isNewArrival ? -1 : 1));
        break;
      case 'featured':
      default:
        list.sort((a) => (a.isFeatured ? -1 : 1));
        break;
    }
  }

  return list;
}

export function getTrendingProducts(): Product[] {
  return mockProducts.filter((p) => p.isFeatured || p.rating >= 4.8).slice(0, 8);
}

export function getBestSellerProducts(): Product[] {
  return mockProducts.filter((p) => p.isBestSeller || (p.discountPercent ?? 0) >= 18).slice(0, 8);
}

export function getNewArrivalProducts(): Product[] {
  return mockProducts.filter((p) => p.isNewArrival || p.category === 'mobile' || p.category === 'watch').slice(0, 8);
}

export function getRelatedProducts(category: string, currentId: string): Product[] {
  return mockProducts
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 4);
}
