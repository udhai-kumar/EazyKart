import { useActionState, useState } from 'react';
import {
  X,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  PackageCheck,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CheckoutActionState, CustomerDetails, OrderReceipt } from '../../types/ecommerce';

const initialCheckoutState: CheckoutActionState = {
  status: 'idle',
};

export default function CheckoutModal() {
  const { cart, isCheckoutOpen, closeCheckout, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'cod'>('card');
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Pure synchronous React 19 `useActionState` for 100% instant submission!
  const [formState, formAction, isPending] = useActionState(
    (
      _prevState: CheckoutActionState,
      formData: FormData
    ): CheckoutActionState => {
      // Extract form fields
      const firstName = (formData.get('firstName') as string)?.trim();
      const lastName = (formData.get('lastName') as string)?.trim();
      const email = (formData.get('email') as string)?.trim();
      const phone = (formData.get('phone') as string)?.trim();
      const address = (formData.get('address') as string)?.trim();
      const city = (formData.get('city') as string)?.trim();
      const state = (formData.get('state') as string)?.trim();
      const zipCode = (formData.get('zipCode') as string)?.trim();
      const country = (formData.get('country') as string)?.trim() || 'United States';
      const method = (formData.get('paymentMethod') as string) || 'Credit Card';

      // Validation
      if (!firstName || !lastName || !email || !address || !city || !zipCode) {
        return {
          status: 'error',
          errorMessage: 'Please fill in all required shipping and contact fields.',
        };
      }

      const customer: CustomerDetails = {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        country,
      };

      const randomOrderId = `EZK-${Math.floor(100000 + Math.random() * 900000)}`;
      const randomTracking = `TRK-${Math.random().toString(36).substring(2, 9).toUpperCase()}-US`;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);

      const orderReceipt: OrderReceipt = {
        orderId: randomOrderId,
        orderDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        customer,
        items: [...cart.items],
        paymentMethod: method,
        subtotal: cart.subtotal,
        discount: cart.discount,
        shipping: cart.shippingCost,
        tax: cart.estimatedTax,
        grandTotal: cart.grandTotal,
        estimatedDelivery: deliveryDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        trackingNumber: randomTracking,
      };

      // Clear cart immediately on successful order creation
      clearCart();

      return {
        status: 'success',
        order: orderReceipt,
      };
    },
    initialCheckoutState
  );

  if (!isCheckoutOpen) return null;

  const handleCopyTracking = (tracking: string) => {
    navigator.clipboard.writeText(tracking);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 dark:bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (!isPending) closeCheckout();
        }}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden z-10 my-8">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-zinc-100">
                {formState.status === 'success' ? 'Order Confirmed!' : 'Secure Express Checkout'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                <Lock className="w-3 h-3 text-emerald-500" />
                End-to-End 256-bit Encrypted Transaction
              </p>
            </div>
          </div>
          <button
            onClick={closeCheckout}
            disabled={isPending}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {formState.status === 'success' && formState.order ? (
          /* Success Receipt View - Instant */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <PackageCheck className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Thank You for Your Order!
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
                We've received your order and dispatched an instant confirmation receipt to{' '}
                <strong>{formState.order.customer.email}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/80 dark:border-zinc-800 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pb-4 border-b border-slate-200 dark:border-zinc-800">
                <div>
                  <span className="text-slate-400">Order Number</span>
                  <p className="font-bold text-slate-900 dark:text-zinc-100 mt-0.5">
                    {formState.order.orderId}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Order Date</span>
                  <p className="font-bold text-slate-900 dark:text-zinc-100 mt-0.5">
                    {formState.order.orderDate}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Estimated Delivery</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {formState.order.estimatedDelivery}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Payment Status</span>
                  <p className="font-bold text-slate-900 dark:text-zinc-100 mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Paid (${formState.order.grandTotal.toFixed(2)})
                  </p>
                </div>
              </div>

              {/* Tracking bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>
                    Tracking Number:{' '}
                    <strong className="font-mono text-brand-700 dark:text-brand-300">
                      {formState.order.trackingNumber}
                    </strong>
                  </span>
                </div>
                <button
                  onClick={() => handleCopyTracking(formState.order!.trackingNumber)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTracking ? 'Copied!' : 'Copy Tracking'}</span>
                </button>
              </div>

              {/* Purchased Items Mini List */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {formState.order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2.5">
                      <img src={item.image} alt={item.name} className="w-9 h-9 object-contain rounded bg-white dark:bg-zinc-800 p-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-zinc-200 truncate max-w-[200px]">{item.name}</p>
                        <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-zinc-100">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                onClick={closeCheckout}
                className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-500/25 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form powered by React 19 Form Action */
          <form action={formAction} className="p-6 sm:p-8 space-y-6">
            {formState.status === 'error' && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-400 font-medium">
                {formState.errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Shipping & Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-500" />
                  1. Shipping Information
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                      First Name *
                    </label>
                    <input
                      required
                      name="firstName"
                      defaultValue="Alex"
                      placeholder="John"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      required
                      name="lastName"
                      defaultValue="Morgan"
                      placeholder="Doe"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      defaultValue="alex.morgan@example.com"
                      placeholder="you@email.com"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue="+1 (555) 234-5678"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Street Address *
                  </label>
                  <input
                    required
                    name="address"
                    defaultValue="742 Market Street, Suite 400"
                    placeholder="123 Main St, Apt 4B"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                      City *
                    </label>
                    <input
                      required
                      name="city"
                      defaultValue="San Francisco"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                      State
                    </label>
                    <input
                      name="state"
                      defaultValue="CA"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                      Zip Code *
                    </label>
                    <input
                      required
                      name="zipCode"
                      defaultValue="94103"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Payment & Summary */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-500" />
                  2. Payment Method
                </h4>

                <input type="hidden" name="paymentMethod" value={paymentMethod} />

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'apple_pay', label: 'Apple Pay', icon: Sparkles },
                    { id: 'google_pay', label: 'Google Pay', icon: ShieldCheck },
                    { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setPaymentMethod(opt.id as any)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                        paymentMethod === opt.id
                          ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 shadow-sm'
                          : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 text-slate-700 dark:text-zinc-300'
                      }`}
                    >
                      <opt.icon className="w-4 h-4 shrink-0" />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/80 dark:border-zinc-800">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                        Card Number
                      </label>
                      <input
                        defaultValue="•••• •••• •••• 4242"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                          Expiry
                        </label>
                        <input
                          defaultValue="12/28"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                          CVC / CVV
                        </label>
                        <input
                          defaultValue="888"
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mini Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/80 dark:border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                    <span>Items Total ({cart.totalQuantity} items)</span>
                    <span className="font-semibold text-slate-900 dark:text-zinc-100">
                      ${cart.subtotal.toFixed(2)}
                    </span>
                  </div>
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Discount ({cart.discountCode})</span>
                      <span>-${cart.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                    <span>Shipping</span>
                    <span>{cart.shippingCost === 0 ? 'FREE' : `$${cart.shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                    <span>Tax</span>
                    <span>${cart.estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 dark:text-white">Amount Due</span>
                    <span className="text-base font-black text-brand-600 dark:text-brand-400">
                      ${cart.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isPending || cart.items.length === 0}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Place Order & Pay ${cart.grandTotal.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
