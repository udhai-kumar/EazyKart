import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Send,
  CheckCircle,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing! Check your inbox for a 15% discount voucher.', 'success');
  };

  const perks = [
    {
      icon: Truck,
      title: 'Free Worldwide Shipping',
      desc: 'On all orders over $150',
    },
    {
      icon: ShieldCheck,
      title: '100% Secure Checkout',
      desc: '256-bit SSL encrypted payments',
    },
    {
      icon: RotateCcw,
      title: '30-Day Free Returns',
      desc: 'Hassle-free money back guarantee',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      desc: 'Expert live agents always ready',
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Service Highlights Perks Bar */}
      <div className="border-b border-slate-800 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div key={perk.title} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{perk.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{perk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Eazy<span className="text-brand-400">Kart</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Modern curated marketplace delivering high-performance audio, premium furniture, flagship smartphones, and wearable lifestyle tech. Built with React 19 architecture.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Join our newsletter for secret sales
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl">
                  <CheckCircle className="w-4 h-4" />
                  <span>You're subscribed! Code <strong>SAVE20</strong> unlocked.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95 shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Shop Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/shop?category=sofa" className="text-slate-400 hover:text-white transition-colors">
                  Modern Sofas & Lounges
                </Link>
              </li>
              <li>
                <Link to="/shop?category=chair" className="text-slate-400 hover:text-white transition-colors">
                  Ergonomic Chairs & Armchairs
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mobile" className="text-slate-400 hover:text-white transition-colors">
                  Smartphones & Flagships
                </Link>
              </li>
              <li>
                <Link to="/shop?category=watch" className="text-slate-400 hover:text-white transition-colors">
                  Smartwatches & Fitness
                </Link>
              </li>
              <li>
                <Link to="/shop?category=wireless" className="text-slate-400 hover:text-white transition-colors">
                  Audio & Wireless Headphones
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/cart" className="text-slate-400 hover:text-white transition-colors">
                  My Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Our Brand
                </Link>
              </li>
              <li>
                <a href="#tracking" onClick={(e) => { e.preventDefault(); showToast('Order tracking active via checkout receipt.', 'info'); }} className="text-slate-400 hover:text-white transition-colors">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Free Express Shipping on all orders over $150.', 'info'); }} className="text-slate-400 hover:text-white transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#returns" onClick={(e) => { e.preventDefault(); showToast('30-Day Money Back Guarantee applies to all orders.', 'info'); }} className="text-slate-400 hover:text-white transition-colors">
                  30-Day Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact HQ</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              742 Evergreen Terrace<br />
              San Francisco, CA 94105<br />
              United States
            </p>
            <p className="text-xs text-slate-400 mt-2">
              <strong>Email:</strong> support@eazykart.io<br />
              <strong>Phone:</strong> +1 (800) 555-EAZY
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Customer Support Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EazyKart Inc. Modernized to React 19 Architecture. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">Secured with: Visa • Mastercard • Apple Pay • Google Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
