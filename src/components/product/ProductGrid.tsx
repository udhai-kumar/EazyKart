import { use } from 'react';
import { Product } from '../../types/ecommerce';
import ProductCard from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: '3' | '4';
}

export default function ProductGrid({
  products,
  emptyMessage = 'No products found matching your criteria.',
  columns = '4',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/80 dark:border-zinc-800">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200">No Products Available</h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  const gridCols = columns === '3'
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

/**
 * React 19 `use(promise)` Async Product Grid for pure Suspense resource resolution!
 */
export function AsyncProductGrid({
  productsPromise,
  columns = '4',
}: {
  productsPromise: Promise<Product[]>;
  columns?: '3' | '4';
}) {
  // Pure React 19 `use(promise)` hook!
  const products = use(productsPromise);
  return <ProductGrid products={products} columns={columns} />;
}
