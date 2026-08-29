import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const {
    cart,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
    openCheckout,
    amountNeededForFreeShipping,
    freeShippingProgress,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) {
      setCouponCode('');
      setCouponError(false);
    } else {
      setCouponError(true);
    }
  };

  return (
    <>
      {/* React 19 Native Document Metadata */}
      <title>Shopping Cart - EazyKart</title>
      <meta
        name="description"
        content="Review items in your shopping bag, apply discount promo coupons, and proceed to secure checkout."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-zinc-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <ShoppingBag className="w-7 h-7 text-brand-500" />
              <span>Your Shopping Cart</span>
              <span className="text-sm font-semibold text-slate-500">
                ({cart.totalQuantity} items)
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              Verify your selected items and configure delivery options before checkout.
            </p>
          </div>

          {cart.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 self-start sm:self-auto flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {cart.items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-8 shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Cart is Currently Empty</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto mt-2">
              Looks like you haven't added anything to your cart yet. Check out our latest living furniture and audio arrivals!
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-500/20 transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items Table/List */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Indicator */}
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">
                    <Truck className="w-4 h-4 text-brand-500" />
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> FREE Shipping Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-brand-600 dark:text-brand-400">${amountNeededForFreeShipping.toFixed(2)}</strong> more for Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-slate-400 text-xs">{freeShippingProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-zinc-800">
                {cart.items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                    {/* Media & Title */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-zinc-950 p-2 flex items-center justify-center shrink-0 border border-slate-100 dark:border-zinc-800">
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <Link to={`/shop/${item.productId}`} className="font-bold text-sm text-slate-900 dark:text-zinc-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                          <span className="capitalize">{item.category}</span>
                          {item.selectedColor && (
                            <>
                              <span>•</span>
                              <span>Color: {item.selectedColor}</span>
                            </>
                          )}
                          {item.selectedSize && (
                            <>
                              <span>•</span>
                              <span>{item.selectedSize}</span>
                            </>
                          )}
                        </div>
                        <span className="sm:hidden font-extrabold text-sm text-slate-900 dark:text-white mt-1 block">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                      <div className="flex items-center border border-slate-200 dark:border-zinc-700 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800 dark:text-zinc-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="hidden sm:block text-right min-w-[80px]">
                        <span className="font-black text-sm text-slate-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-slate-400">${item.price} ea</p>
                        )}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800 p-6 shadow-xl space-y-6">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Order Summary
                </h3>

                {/* Coupon Box */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                    Promo / Discount Code
                  </label>
                  {cart.discountCode ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-xs">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-semibold">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{cart.discountCode} (-${cart.discount.toFixed(2)})</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-slate-400 hover:text-rose-500 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. SAVE20"
                        className="flex-1 px-3 py-2 text-xs uppercase placeholder:normal-case bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-brand-500 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 hover:bg-brand-100 font-bold text-xs rounded-xl border border-brand-200 dark:border-brand-800"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-[10px] text-rose-500">
                      Invalid coupon code. Try <strong>SAVE20</strong> or <strong>EAZY10</strong>.
                    </p>
                  )}
                </div>

                {/* Summary Calculations */}
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-zinc-100">
                      ${cart.subtotal.toFixed(2)}
                    </span>
                  </div>
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Coupon Discount</span>
                      <span>-${cart.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{cart.shippingCost === 0 ? <strong className="text-emerald-500 uppercase">FREE</strong> : `$${cart.shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span>${cart.estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-baseline">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">Estimated Total</span>
                    <span className="text-xl font-black text-brand-600 dark:text-brand-400">
                      ${cart.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Proceed to Checkout Trigger */}
                <button
                  onClick={openCheckout}
                  className="w-full py-4 px-6 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
