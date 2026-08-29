import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  Check,
  Plus,
  Minus,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(quickViewProduct.image);
      setSelectedColor(quickViewProduct.colors?.[0] || '');
      setSelectedSize(quickViewProduct.sizes?.[0] || '');
      setQuantity(1);
      setActiveTab('overview');
    }
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickViewProduct) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);
  const allImages = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.image];

  const handleAddToCart = () => {
    addItem({
      productId: quickViewProduct.id,
      name: quickViewProduct.name,
      price: quickViewProduct.price,
      originalPrice: quickViewProduct.originalPrice,
      image: selectedImage || quickViewProduct.image,
      category: quickViewProduct.category,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeQuickView}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden z-10 my-8 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Images Gallery */}
          <div className="p-6 sm:p-8 bg-slate-50 dark:bg-zinc-950/60 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-zinc-800">
            <div className="relative aspect-square w-full rounded-2xl bg-white dark:bg-zinc-900 p-6 flex items-center justify-center border border-slate-200/60 dark:border-zinc-800/80 shadow-sm overflow-hidden">
              <img
                src={selectedImage || quickViewProduct.image}
                alt={quickViewProduct.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
              {quickViewProduct.discountPercent && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-extrabold bg-rose-500 text-white rounded-full">
                  -{quickViewProduct.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Pickers */}
            {allImages.length > 1 && (
              <div className="flex gap-2.5 mt-4 justify-center overflow-x-auto py-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-xl p-1 bg-white dark:bg-zinc-900 border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-brand-500 shadow-md ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{quickViewProduct.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">
                    ({quickViewProduct.reviewCount} customer reviews)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5 leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Price & Stock */}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ${quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-base text-slate-400 line-through">
                    ${quickViewProduct.originalPrice}
                  </span>
                )}
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Stock ({quickViewProduct.stockCount} left)
                </span>
              </div>

              {/* Variants: Colors */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mt-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                    Color: <span className="font-normal text-slate-500">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedColor === color
                            ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20'
                            : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variants: Sizes */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                    Option / Size: <span className="font-normal text-slate-500">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedSize === size
                            ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20'
                            : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tabs: Overview, Specs, Reviews */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <div className="flex gap-4 border-b border-slate-100 dark:border-zinc-800 text-xs font-bold pb-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`transition-colors ${
                      activeTab === 'overview'
                        ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-500 pb-2'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`transition-colors ${
                      activeTab === 'specs'
                        ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-500 pb-2'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`transition-colors ${
                      activeTab === 'reviews'
                        ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-500 pb-2'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Reviews ({quickViewProduct.reviews.length})
                  </button>
                </div>

                <div className="pt-3 text-xs text-slate-600 dark:text-zinc-400 max-h-32 overflow-y-auto leading-relaxed">
                  {activeTab === 'overview' && <p>{quickViewProduct.description}</p>}
                  {activeTab === 'specs' && (
                    <div className="space-y-1.5">
                      {Object.entries(quickViewProduct.specifications).map(([key, val]) => (
                        <div key={key} className="flex justify-between py-0.5 border-b border-slate-100 dark:border-zinc-800/60">
                          <span className="font-semibold text-slate-700 dark:text-zinc-300">{key}:</span>
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="space-y-2">
                      {quickViewProduct.reviews.length === 0 ? (
                        <p className="italic text-slate-400">No reviews yet. Be the first to review!</p>
                      ) : (
                        quickViewProduct.reviews.map((rev) => (
                          <div key={rev.id} className="p-2 rounded-lg bg-slate-50 dark:bg-zinc-800/50">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800 dark:text-zinc-200">{rev.author}</span>
                              <span className="text-amber-500 font-bold">★ {rev.rating}</span>
                            </div>
                            <p className="mt-1 text-[11px]">{rev.comment}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 dark:border-zinc-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-slate-800 dark:text-zinc-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart • ${(quickViewProduct.price * quantity).toFixed(2)}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3 rounded-xl border transition-all ${
                    isFavorited
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-500 shadow-sm'
                      : 'border-slate-200 dark:border-zinc-700 text-slate-400 hover:text-rose-500'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* View Full Product Details Link */}
              <div className="flex items-center justify-between text-xs pt-1">
                <Link
                  to={`/shop/${quickViewProduct.id}`}
                  onClick={closeQuickView}
                  className="font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <span>View Full Product Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> Free Returns within 30 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
