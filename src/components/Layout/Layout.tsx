import { ReactNode } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CartDrawer from '../cart/CartDrawer';
import QuickViewModal from '../product/QuickViewModal';
import CheckoutModal from '../checkout/CheckoutModal';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Sticky Header */}
      <Header />

      {/* Main Content View */}
      <main className="flex-1 w-full pb-16">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Slide-Over & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />
    </div>
  );
}
