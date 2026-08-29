import {
  SlidersHorizontal,
  RotateCcw,
  Star,
  Check,
  Tag,
  DollarSign,
  Layers,
  Sparkles,
} from 'lucide-react';
import { FilterState, ProductCategory } from '../../types/ecommerce';
import { productCategories } from '../../data/products';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalFilteredCount: number;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  totalFilteredCount,
}: FilterSidebarProps) {
  const handleCategoryChange = (category: ProductCategory) => {
    onFilterChange({ ...filters, category });
  };

  const handlePriceChange = (maxPrice: number) => {
    onFilterChange({ ...filters, priceRange: [filters.priceRange[0], maxPrice] });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating });
  };

  const handleInStockToggle = () => {
    onFilterChange({ ...filters, inStockOnly: !filters.inStockOnly });
  };

  const handleOnSaleToggle = () => {
    onFilterChange({ ...filters, onSaleOnly: !filters.onSaleOnly });
  };

  const isFiltered =
    filters.category !== 'all' ||
    filters.priceRange[1] < 1500 ||
    filters.minRating > 0 ||
    filters.inStockOnly ||
    filters.onSaleOnly ||
    filters.searchQuery !== '';

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      {/* Top Filter Header */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100">
            Faceted Filters
          </h3>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
            {totalFilteredCount}
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Facet */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-brand-500" />
          Category
        </h4>
        <div className="space-y-1">
          {productCategories.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id as ProductCategory)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-bold'
                    : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-brand-200 dark:bg-brand-900/60 text-brand-800 dark:text-brand-200'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-brand-500" />
            Max Price
          </h4>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            ${filters.priceRange[1]}
          </span>
        </div>

        <input
          type="range"
          min="50"
          max="1500"
          step="25"
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />

        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>$50</span>
          <span>$750</span>
          <span>$1500+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-500" />
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4.5, 4.0, 3.5].map((rating) => {
            const isSelected = filters.minRating === rating;
            return (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800'
                    : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{rating} Stars & Above</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Toggles: Stock & Deals */}
      <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          Availability & Deals
        </h4>

        {/* In Stock Toggle */}
        <label className="flex items-center justify-between cursor-pointer py-1.5">
          <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={handleInStockToggle}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700"
          />
        </label>

        {/* On Sale Toggle */}
        <label className="flex items-center justify-between cursor-pointer py-1.5 border-t border-slate-100 dark:border-zinc-800">
          <span className="text-xs font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-rose-500" />
            Special Deals & Discounts
          </span>
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={handleOnSaleToggle}
            className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700"
          />
        </label>
      </div>
    </aside>
  );
}
