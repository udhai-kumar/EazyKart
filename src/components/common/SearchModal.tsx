import { useState, useEffect, useRef, InputHTMLAttributes, Ref, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, TrendingUp, Tag } from 'lucide-react';
import { mockProducts } from '../../data/products';
import { Product } from '../../types/ecommerce';
import { useCart } from '../../context/CartContext';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

// React 19: Direct ref prop passed without forwardRef!
function SearchInput({ ref, ...props }: SearchInputProps) {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full bg-transparent pl-11 pr-10 py-3.5 text-base text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
    />
  );
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { openQuickView, addItem } = useCart();

  const recentSearches = ['Sony WH-1000XM5', 'Apple Watch Ultra', 'Velvet Sofa', 'iPhone 15'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // open modal if parent triggers
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const matches = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(matches.slice(0, 6));
  }, [query]);

  const handleSelectProduct = (id: string) => {
    onClose();
    navigate(`/shop/${id}`);
  };

  const handleQuickAdd = (e: MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      quantity: 1,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden z-10 animate-slide-up">
        {/* Search Input Bar with React 19 Direct ref */}
        <div className="relative border-b border-slate-100 dark:border-zinc-800 flex items-center px-4">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 dark:text-zinc-500" />
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="Search products, brands, categories (e.g. Sofa, iPhone, Watch)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-mono font-medium text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="space-y-4 py-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-500" />
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/40 dark:hover:text-brand-400 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent-amber" />
                  Featured Categories
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'Sofas & Living', category: 'sofa' },
                    { name: 'Phones & Tech', category: 'mobile' },
                    { name: 'Lounge Chairs', category: 'chair' },
                    { name: 'Smart Watches', category: 'watch' },
                    { name: 'Audio & Wireless', category: 'wireless' },
                  ].map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => {
                        onClose();
                        navigate(`/shop?category=${cat.category}`);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-zinc-800 hover:border-brand-500/30 hover:bg-slate-50 dark:hover:bg-zinc-800/60 text-left transition-all"
                    >
                      <span className="text-xs font-medium text-slate-800 dark:text-zinc-200">{cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1">
                Found {results.length} Product{results.length > 1 ? 's' : ''}
              </p>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/80 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-zinc-700/60 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-zinc-800 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500 dark:text-zinc-400 capitalize flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {product.category}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-zinc-100">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                        openQuickView(product);
                      }}
                      className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="px-3 py-1 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-sm transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">No products found</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                We couldn't find any products matching "{query}". Try checking for typos or searching a category.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-zinc-950/60 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-zinc-800 rounded font-mono">ESC</kbd> to close</span>
          <button
            onClick={() => {
              onClose();
              navigate(`/shop?search=${encodeURIComponent(query)}`);
            }}
            className="font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            View all results
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
