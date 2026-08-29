import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import heroImg from '../../assets/images/hero-img.png';
import counterTimerImg from '../../assets/images/counter-timer-img.png';
import singleSofaImg from '../../assets/images/single-sofa-04.png';
import { productCategories } from '../../data/products';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      badge: 'SPRING LIVING SALE • UP TO 40% OFF',
      badgeColor: 'bg-rose-500 text-white',
      title: 'Next-Gen Comfort for Modern Spaces',
      subtitle: 'Discover handcrafted double sofas, ergonomic lounge chairs, and minimalist Scandinavian decor engineered for enduring comfort.',
      ctaText: 'Shop Sofas & Living',
      ctaLink: '/shop?category=sofa',
      secondaryText: 'View All Deals',
      secondaryLink: '/shop',
      image: heroImg,
      accent: 'from-brand-500/20 via-purple-500/10 to-transparent',
    },
    {
      id: 2,
      badge: 'FLAGSHIP TECH & AUDIO • EXCLUSIVE RELEASE',
      badgeColor: 'bg-amber-400 text-slate-950',
      title: 'Pure Acoustic Immersion & Flagships',
      subtitle: 'Experience industry-leading ANC headphones, Apple Titanium watches, and cutting-edge smartphones built for pure performance.',
      ctaText: 'Explore Audio & Tech',
      ctaLink: '/shop?category=wireless',
      secondaryText: 'Browse Mobiles',
      secondaryLink: '/shop?category=mobile',
      image: counterTimerImg,
      accent: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    },
    {
      id: 3,
      badge: 'LIMITED EDITION • DESIGNER ACCENTS',
      badgeColor: 'bg-emerald-500 text-white',
      title: 'Elevate Your Reading Corner & Studio',
      subtitle: 'Curated single-seat lounge armchairs and solid oak dining furniture designed for aesthetic and ergonomic excellence.',
      ctaText: 'Discover Lounge Chairs',
      ctaLink: '/shop?category=chair',
      secondaryText: 'Explore All',
      secondaryLink: '/shop',
      image: singleSofaImg,
      accent: 'from-purple-500/20 via-pink-500/10 to-transparent',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="space-y-8">
      {/* Main Hero Slider Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl">
        {/* Subtle Background Glow Accent */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${slide.accent} pointer-events-none transition-all duration-700`}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className={`px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase rounded-full shadow-sm ${slide.badgeColor}`}>
                  {slide.badge}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-400 font-semibold">
                  <Flame className="w-3.5 h-3.5" /> Hot Deal
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to={slide.ctaLink}
                  className="px-6 py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-lg shadow-brand-500/30 flex items-center gap-2 active:scale-95 transition-all"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={slide.secondaryLink}
                  className="px-5 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white text-xs sm:text-sm font-bold rounded-xl border border-slate-700 transition-all"
                >
                  {slide.secondaryText}
                </Link>
              </div>

              {/* Stats Ticker */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-white">10K+</h4>
                  <p className="text-[11px] text-slate-400">Happy Shoppers</p>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-emerald-400">4.9/5</h4>
                  <p className="text-[11px] text-slate-400">Average Rating</p>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-brand-400">Free</h4>
                  <p className="text-[11px] text-slate-400">Express Delivery</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-full max-w-sm aspect-square flex items-center justify-center p-4">
                {/* Glowing ring background */}
                <div className="absolute inset-0 bg-brand-500/10 rounded-full blur-3xl" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="relative max-h-80 max-w-full object-contain drop-shadow-2xl animate-fade-in hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Controls */}
        <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5 px-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === i ? 'w-6 bg-brand-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="bg-white dark:bg-zinc-900 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(cat.id === 'all' ? '/shop' : `/shop?category=${cat.id}`)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 bg-slate-50 dark:bg-zinc-800/60 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200/60 dark:border-zinc-700/60 hover:border-brand-500/30 whitespace-nowrap transition-all"
            >
              <span>{cat.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-zinc-700 text-slate-600 dark:text-zinc-300">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
