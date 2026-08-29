import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  ShoppingBag,
} from 'lucide-react';
import { FilterState, ProductCategory, SortOption } from '../types/ecommerce';
import { getFilteredProducts } from '../services/productService';
import FilterSidebar from '../components/filter/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import ProductCard from '../components/product/ProductCard';
import { useWishlist } from '../context/WishlistContext';

const defaultFilters: FilterState = {
  category: 'all',
  priceRange: [0, 1500],
  minRating: 0,
  inStockOnly: false,
  onSaleOnly: false,
  searchQuery: '',
  sortBy: 'featured',
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();

  const [filters, setFilters] = useState<FilterState>(() => {
    const categoryParam = (searchParams.get('category') as ProductCategory) || 'all';
    const searchParam = searchParams.get('search') || '';
    const sortParam = (searchParams.get('sort') as SortOption) || 'featured';

    return {
      ...defaultFilters,
      category: categoryParam,
      searchQuery: searchParam,
      sortBy: sortParam,
    };
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory;
    const search = searchParams.get('search');

    if (cat && cat !== filters.category) {
      setFilters((prev) => ({ ...prev, category: cat }));
    }
    if (search !== null && search !== filters.searchQuery) {
      setFilters((prev) => ({ ...prev, searchQuery: search }));
    }
  }, [searchParams]);

  // Compute filtered products
  const filteredProducts = useMemo(() => {
    const isWishlistFilter = searchParams.get('filter') === 'wishlist';
    if (isWishlistFilter) {
      return wishlist;
    }

    return getFilteredProducts({
      category: filters.category,
      searchQuery: filters.searchQuery,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      minRating: filters.minRating,
      inStockOnly: filters.inStockOnly,
      onSaleOnly: filters.onSaleOnly,
      sortBy: filters.sortBy,
    });
  }, [filters, searchParams, wishlist]);

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setSearchParams({});
  };

  const handleSearchChange = (q: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: q }));
  };

  const handleSortChange = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const isWishlistMode = searchParams.get('filter') === 'wishlist';

  return (
    <>
      {/* React 19 Native Document Metadata */}
      <title>Shop Catalog - EazyKart</title>
      <meta
        name="description"
        content="Browse our complete catalog of furniture, smartphones, smartwatches, and headphones with instant faceted filtering."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-400 text-xs font-extrabold uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" />
              <span>{isWishlistMode ? 'Bookmarked Favorites' : 'Explore Collections'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              {isWishlistMode
                ? 'Your Saved Wishlist'
                : filters.category === 'all'
                ? 'All Products Catalog'
                : `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Collection`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg">
              {isWishlistMode
                ? 'Items you have saved for later. Move them directly to your cart whenever you are ready.'
                : 'Filter by category, price range, customer ratings, and in-stock status with instant updates.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center min-w-[100px]">
              <span className="text-xl font-black text-white">{filteredProducts.length}</span>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Available</p>
            </div>
          </div>
        </div>

        {/* Action Controls Bar (Search, Sort, Mobile Filter Button, View Switcher) */}
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products in catalog..."
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-xs bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
            {filters.searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 rounded-xl"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Sort By:
              </span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Grid / List View Mode */}
            <div className="hidden sm:flex items-center border border-slate-200 dark:border-zinc-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200'
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {(filters.category !== 'all' ||
          filters.priceRange[1] < 1500 ||
          filters.minRating > 0 ||
          filters.inStockOnly ||
          filters.onSaleOnly ||
          filters.searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Active Filters:</span>
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold border border-brand-200 dark:border-brand-800">
                Category: {filters.category}
                <button onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}
            {filters.priceRange[1] < 1500 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold border border-brand-200 dark:border-brand-800">
                Max ${filters.priceRange[1]}
                <button onClick={() => setFilters((prev) => ({ ...prev, priceRange: [0, 1500] }))}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}
            {filters.minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800">
                ★ {filters.minRating}+ Rating
                <button onClick={() => setFilters((prev) => ({ ...prev, minRating: 0 }))}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}
            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                In Stock Only
                <button onClick={() => setFilters((prev) => ({ ...prev, inStockOnly: false }))}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}
            {filters.onSaleOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200 dark:border-rose-800">
                On Sale
                <button onClick={() => setFilters((prev) => ({ ...prev, onSaleOnly: false }))}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-rose-500 hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalFilteredCount={filteredProducts.length}
            />
          </div>

          {/* Mobile Filter Sidebar Drawer */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
              <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setIsMobileFilterOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
                <div className="w-screen max-w-xs bg-white dark:bg-zinc-900 p-6 overflow-y-auto shadow-2xl">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-zinc-800">
                    <h3 className="font-bold text-sm">Filters</h3>
                    <button onClick={() => setIsMobileFilterOpen(false)}>
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={(f) => {
                      setFilters(f);
                      setIsMobileFilterOpen(false);
                    }}
                    onReset={handleResetFilters}
                    totalFilteredCount={filteredProducts.length}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Product Grid / List Results */}
          <div className="flex-1 w-full min-w-0">
            {viewMode === 'grid' ? (
              <ProductGrid
                products={filteredProducts}
                columns="3"
                emptyMessage="No products match your current filters. Try relaxing your price slider or choosing a different category."
              />
            ) : (
              <div className="space-y-4">
                {filteredProducts.length === 0 ? (
                  <ProductGrid
                    products={[]}
                    emptyMessage="No products match your current filters."
                  />
                ) : (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
