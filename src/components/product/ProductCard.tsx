import { Ref, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Eye, Heart, Sparkles, Check } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export interface ProductCardProps {
  product: Product;
  ref?: Ref<HTMLDivElement>; // React 19: Direct ref prop support
}

// React 19: Direct ref prop without forwardRef!
export default function ProductCard({ product, ref }: ProductCardProps) {
  const { addItem, openQuickView, cart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const inCartCount = cart.items
    .filter((i) => i.productId === product.id)
    .reduce((sum, i) => sum + i.quantity, 0);

  const handleQuickAdd = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      selectedColor: product.colors?.[0],
      selectedSize: product.sizes?.[0],
      quantity: 1,
    });
  };

  const handleQuickView = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleToggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      ref={ref}
      className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 hover:border-brand-500/40 dark:hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 overflow-hidden"
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full bg-slate-50 dark:bg-zinc-950/60 p-6 flex items-center justify-center overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.discountPercent && (
            <span className="px-2 py-0.5 text-[11px] font-extrabold bg-rose-500 text-white rounded-full shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5" /> Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-600 text-white rounded-full shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
            isFavorited
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-500 shadow-md'
              : 'bg-white/80 dark:bg-zinc-800/80 text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-zinc-700 shadow-sm'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Product Image */}
        <Link to={`/shop/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2 px-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-slate-800 dark:text-zinc-100 rounded-xl text-xs font-bold shadow-lg border border-slate-200/80 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="py-2 px-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-500/25 flex items-center justify-center gap-1 transition-all active:scale-95"
            title="Quick Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="flex-1 flex flex-col p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 text-xs mb-1">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/shop/${product.id}`} className="group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1 flex-1">
          {product.shortDesc}
        </p>

        {/* Price & Cart Status Bottom Row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-slate-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              inCartCount > 0
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600'
            }`}
          >
            {inCartCount > 0 ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{inCartCount} in Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
