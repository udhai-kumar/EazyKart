import { Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Zap, ArrowRight, Flame } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner';
import { AsyncProductGrid } from '../components/product/ProductGrid';
import ProductSkeleton from '../components/product/ProductSkeleton';
import {
  getTrendingProducts,
  getBestSellerProducts,
  getNewArrivalProducts,
} from '../services/productService';

export default function Home() {
  // Memoized promises for React 19 use(promise) and Suspense boundaries
  const trendingPromise = useMemo(() => Promise.resolve(getTrendingProducts()), []);
  const bestSellerPromise = useMemo(() => Promise.resolve(getBestSellerProducts()), []);
  const newArrivalPromise = useMemo(() => Promise.resolve(getNewArrivalProducts()), []);

  return (
    <>
      {/* React 19 Native Document Metadata */}
      <title>EazyKart - Next-Gen Modern Living & Flagship Tech</title>
      <meta
        name="description"
        content="Shop luxury living sofas, ergonomic armchairs, flagship Apple & Samsung smartphones, smartwatches, and audiophile wireless headphones."
      />
      <meta property="og:title" content="EazyKart - Premium E-Commerce" />

      <div className="space-y-16 py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner with Promotions & Category Pills */}
        <HeroBanner />

        {/* Section 1: Trending Products (React 19 Suspense) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Curated Picks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Trending Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Suspense fallback={<ProductSkeleton count={4} />}>
            <AsyncProductGrid productsPromise={trendingPromise} />
          </Suspense>
        </section>

        {/* Mid-Page Promo Highlight Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Zap className="w-3.5 h-3.5 text-amber-300" /> Limited Time Flash Sale
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Upgrade Your Living & Audio Gear with Extra 20% OFF
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Apply discount promo code <strong className="text-white underline">SAVE20</strong> at checkout to redeem savings on all sofas, Apple titanium devices, and Bose headphones.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-95"
              >
                <span>Shop Flash Sale</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: Best Selling Furniture & Flagships (React 19 Suspense) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Customer Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Best Selling Products
              </h2>
            </div>
            <Link
              to="/shop?category=sofa"
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore Sofas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Suspense fallback={<ProductSkeleton count={4} />}>
            <AsyncProductGrid productsPromise={bestSellerPromise} />
          </Suspense>
        </section>

        {/* Section 3: New Arrivals & Tech (React 19 Suspense) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Just Dropped</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                New Arrivals & Audio
              </h2>
            </div>
            <Link
              to="/shop?category=wireless"
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore Audio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Suspense fallback={<ProductSkeleton count={4} />}>
            <AsyncProductGrid productsPromise={newArrivalPromise} />
          </Suspense>
        </section>
      </div>
    </>
  );
}
