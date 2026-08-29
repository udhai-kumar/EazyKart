import { use, Suspense, useMemo, useState, useActionState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  ArrowLeft,
  Share2,
  CheckCircle,
  MessageSquarePlus,
  User,
} from 'lucide-react';
import { fetchProductById, getRelatedProducts } from '../services/productService';
import { Product, Review } from '../types/ecommerce';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductGrid from '../components/product/ProductGrid';
import ProductSkeleton from '../components/product/ProductSkeleton';

interface ReviewFormState {
  status: 'idle' | 'success' | 'error';
  reviews: Review[];
}

function ProductDetailsContent({ productPromise }: { productPromise: Promise<Product | null> }) {
  // Pure React 19 `use(promise)` data loader!
  const initialProduct = use(productPromise);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!initialProduct) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">Product Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The product you are looking for does not exist or has been retired.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState<string>(initialProduct.image);
  const [selectedColor, setSelectedColor] = useState<string>(initialProduct.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(initialProduct.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  const initialReviewState: ReviewFormState = {
    status: 'idle',
    reviews: initialProduct.reviews || [],
  };

  // React 19 `useActionState` for adding new customer reviews!
  const [reviewState, reviewAction, isReviewPending] = useActionState(
    (prevState: ReviewFormState, formData: FormData): ReviewFormState => {
      const author = (formData.get('author') as string)?.trim();
      const rating = Number(formData.get('rating')) || 5;
      const comment = (formData.get('comment') as string)?.trim();

      if (!author || !comment) {
        return { ...prevState, status: 'error' };
      }

      const newRev: Review = {
        id: `rev-${Date.now()}`,
        author,
        rating,
        date: new Date().toISOString().split('T')[0],
        comment,
        verified: true,
      };

      showToast('Thank you for submitting your review!', 'success');

      return {
        status: 'success',
        reviews: [newRev, ...prevState.reviews],
      };
    },
    initialReviewState
  );

  const isFavorited = isInWishlist(initialProduct.id);
  const allImages = initialProduct.images && initialProduct.images.length > 0
    ? initialProduct.images
    : [initialProduct.image];

  const relatedProducts = getRelatedProducts(initialProduct.category, initialProduct.id);

  const handleAddToCart = () => {
    addItem({
      productId: initialProduct.id,
      name: initialProduct.name,
      price: initialProduct.price,
      originalPrice: initialProduct.originalPrice,
      image: selectedImage || initialProduct.image,
      category: initialProduct.category,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: initialProduct.name,
        text: initialProduct.shortDesc,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <>
      {/* React 19 Native Document Metadata */}
      <title>{`${initialProduct.name} - EazyKart`}</title>
      <meta name="description" content={initialProduct.shortDesc} />
      <meta property="og:title" content={initialProduct.name} />

      <div className="space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-600">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${initialProduct.category}`} className="capitalize hover:text-brand-600">
            {initialProduct.category}
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-zinc-100 font-semibold truncate max-w-xs">
            {initialProduct.name}
          </span>
        </div>

        {/* Product Details Hero Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery Images Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl bg-slate-50 dark:bg-zinc-950/60 p-8 flex items-center justify-center border border-slate-100 dark:border-zinc-800 overflow-hidden group">
                <img
                  src={selectedImage}
                  alt={initialProduct.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {initialProduct.discountPercent && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-extrabold bg-rose-500 text-white rounded-full shadow-md">
                    -{initialProduct.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl p-1 bg-slate-50 dark:bg-zinc-950 border-2 transition-all shrink-0 ${
                        selectedImage === img
                          ? 'border-brand-500 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Actions Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                    {initialProduct.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      title="Share Product"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(initialProduct)}
                      className={`p-2 rounded-xl border transition-all ${
                        isFavorited
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-500'
                          : 'border-slate-200 dark:border-zinc-800 text-slate-400 hover:text-rose-500'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {initialProduct.name}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{initialProduct.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">
                      ({reviewState.reviews.length} customer reviews)
                    </span>
                  </div>
                  <span className="text-slate-300 dark:text-zinc-700">|</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock ({initialProduct.stockCount} left)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    ${initialProduct.price}
                  </span>
                  {initialProduct.originalPrice && (
                    <span className="text-lg text-slate-400 line-through">
                      ${initialProduct.originalPrice}
                    </span>
                  )}
                  {initialProduct.discountPercent && (
                    <span className="text-xs font-bold text-rose-500">
                      Save ${(initialProduct.originalPrice! - initialProduct.price).toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {initialProduct.shortDesc}
                </p>

                {/* Color Variants */}
                {initialProduct.colors && initialProduct.colors.length > 0 && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                      Select Color: <span className="font-normal text-slate-500">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {initialProduct.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            selectedColor === c
                              ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20'
                              : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size / Specs Variants */}
                {initialProduct.sizes && initialProduct.sizes.length > 0 && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-2">
                      Select Size / Spec: <span className="font-normal text-slate-500">{selectedSize}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {initialProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            selectedSize === s
                              ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20'
                              : 'border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 dark:border-zinc-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-3 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 text-sm font-bold text-slate-800 dark:text-zinc-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-3 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ${(initialProduct.price * quantity).toFixed(2)}</span>
                  </button>
                </div>

                {/* Trust Perks */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-brand-500" />
                    <span>Free Shipping $150+</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-brand-500" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-500" />
                    <span>2-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview, Specifications, Reviews */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex gap-8 border-b border-slate-200 dark:border-zinc-800 text-sm font-bold pb-3">
            <button
              onClick={() => setActiveTab('desc')}
              className={`transition-all pb-3 relative ${
                activeTab === 'desc'
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Full Description
              {activeTab === 'desc' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`transition-all pb-3 relative ${
                activeTab === 'specs'
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Technical Specs
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`transition-all pb-3 relative ${
                activeTab === 'reviews'
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Reviews ({reviewState.reviews.length})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
          </div>

          <div className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4 max-w-3xl">
                <p>{initialProduct.description}</p>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-100 dark:border-zinc-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2">
                    Product Highlights
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-500 dark:text-zinc-400">
                    <li>Certified premium materials and stress-tested durability</li>
                    <li>Designed for contemporary homes and modern workflows</li>
                    <li>Includes official manufacturer warranty and express support</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl divide-y divide-slate-100 dark:divide-zinc-800">
                {Object.entries(initialProduct.specifications).map(([key, val]) => (
                  <div key={key} className="py-3 flex justify-between">
                    <span className="font-semibold text-slate-800 dark:text-zinc-200">{key}</span>
                    <span className="text-slate-500 dark:text-zinc-400">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8 max-w-3xl">
                {/* Submit Review Form (React 19 Form Action) */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/80 dark:border-zinc-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquarePlus className="w-4 h-4 text-brand-500" />
                    Write a Verified Customer Review
                  </h4>
                  <form action={reviewAction} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                          Your Name
                        </label>
                        <input
                          required
                          name="author"
                          placeholder="e.g. Jordan Miller"
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                          Rating (Stars)
                        </label>
                        <select
                          name="rating"
                          defaultValue="5"
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                        >
                          <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                          <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                          <option value="3">★★★☆☆ (3 Stars - Average)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                        Review Feedback
                      </label>
                      <textarea
                        required
                        name="comment"
                        rows={3}
                        placeholder="Tell others about the quality, feel, and performance..."
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isReviewPending}
                      className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isReviewPending ? 'Submitting...' : 'Post Review'}
                    </button>
                  </form>
                </div>

                {/* Existing Reviews List */}
                <div className="space-y-4">
                  {reviewState.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-slate-800 dark:text-zinc-200">
                              {rev.author}
                            </h5>
                            {rev.verified && (
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                                <CheckCircle className="w-3 h-3" /> Verified Buyer
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{rev.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-zinc-400">{rev.comment}</p>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Related Products You Might Like
            </h3>
            <ProductGrid products={relatedProducts} columns="4" />
          </section>
        )}
      </div>
    </>
  );
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  // Fetch promise for React 19 Suspense
  const productPromise = useMemo(() => {
    return fetchProductById(id || '');
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<ProductSkeleton count={1} />}>
        <ProductDetailsContent productPromise={productPromise} />
      </Suspense>
    </div>
  );
}
