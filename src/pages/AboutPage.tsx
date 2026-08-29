import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Award,
  Cpu,
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Active Happy Customers', value: '45,000+' },
    { label: 'Curated Products', value: '500+' },
    { label: 'Customer Satisfaction', value: '99.4%' },
    { label: 'Countries Shipped', value: '38+' },
  ];

  const values = [
    {
      icon: Award,
      title: 'Obsessive Quality',
      desc: 'Every sofa, armchair, and audio component undergoes rigorous 50-point durability and acoustic testing.',
    },
    {
      icon: Cpu,
      title: 'Modern Architecture',
      desc: 'Powered by React 19, Vite, and non-blocking optimistic state updates for instantaneous shopping experiences.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Trust',
      desc: 'No hidden fees, 30-day no-questions-asked returns, and 256-bit encrypted secure checkout.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer-First Heart',
      desc: 'Dedicated 24/7 concierge support ready to assist you with styling advice, tech support, and order tracking.',
    },
  ];

  const testimonials = [
    {
      quote: "EazyKart completely transformed how we furnished our modern studio. The Westview sofa is impeccably built and delivery was lightning fast!",
      author: "Samantha Roberts",
      role: "Architectural Interior Designer, NYC",
    },
    {
      quote: "The Sony WH-1000XM5 and Apple Watch Ultra arrived within 2 days in pristine packaging. Smooth, lag-free shopping experience.",
      author: "David Vance",
      role: "Software Engineering Lead, Austin",
    },
  ];

  return (
    <>
      {/* React 19 Native Document Metadata */}
      <title>About Us - EazyKart Story & Mission</title>
      <meta
        name="description"
        content="Learn about EazyKart's mission to bring handcrafted living furniture and flagship audio tech together under a modern React 19 shopping experience."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-14 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Our Story & Mission
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Designing the Future of Modern Living & Flagship Tech.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Founded with the conviction that premium furniture and cutting-edge consumer electronics should be accessible, durable, and delightful to discover.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-center space-y-1 shadow-sm"
            >
              <h3 className="text-3xl sm:text-4xl font-black text-brand-600 dark:text-brand-400">
                {stat.value}
              </h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Our Core Principles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Every design decision, supplier partnership, and software optimization is anchored in our core values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 space-y-3 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{v.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8 bg-slate-50 dark:bg-zinc-900/60 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-zinc-800">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Loved by Creators & Homeowners
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Read what verified shoppers say about our furniture and tech selections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 shadow-sm space-y-4"
              >
                <p className="text-sm italic text-slate-700 dark:text-zinc-300 leading-relaxed">
                  "{t.quote}"
                </p>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">{t.author}</h5>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-black tracking-tight">Ready to Elevate Your Space?</h3>
            <p className="text-xs sm:text-sm text-indigo-100">
              Explore our curated catalog with exclusive seasonal savings today.
            </p>
          </div>
          <Link
            to="/shop"
            className="px-6 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-95 shrink-0"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </>
  );
}
