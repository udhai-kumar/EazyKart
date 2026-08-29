export default function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/60 dark:border-zinc-800 p-4 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="aspect-square w-full rounded-xl bg-slate-200 dark:bg-zinc-800 mb-4" />

          {/* Info skeleton */}
          <div className="space-y-2.5 flex-1">
            <div className="flex justify-between items-center">
              <div className="h-3 w-16 bg-slate-200 dark:bg-zinc-800 rounded" />
              <div className="h-3 w-10 bg-slate-200 dark:bg-zinc-800 rounded" />
            </div>
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-full bg-slate-100 dark:bg-zinc-800/60 rounded" />
            <div className="h-3 w-4/5 bg-slate-100 dark:bg-zinc-800/60 rounded" />
          </div>

          {/* Bottom skeleton */}
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-100 dark:border-zinc-800">
            <div className="h-5 w-14 bg-slate-200 dark:bg-zinc-800 rounded" />
            <div className="h-8 w-20 bg-slate-200 dark:bg-zinc-800 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
