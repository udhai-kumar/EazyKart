import { Product } from '../types/ecommerce';

// Import images
import sofa01 from '../assets/images/double-sofa-01.png';
import sofa02 from '../assets/images/double-sofa-02.png';
import sofa03 from '../assets/images/double-sofa-03.png';
import singleSofa01 from '../assets/images/single-sofa-01.jpg';
import singleSofa02 from '../assets/images/single-sofa-02.jpg';
import singleSofa03 from '../assets/images/single-sofa-03.jpg';
import singleSofa04 from '../assets/images/single-sofa-04.png';

import chair01 from '../assets/images/arm-chair-01.jpg';
import chair02 from '../assets/images/arm-chair-02.jpg';
import chair03 from '../assets/images/arm-chair-03.jpg';

import phone01 from '../assets/images/phone-01.jpg';
import phone02 from '../assets/images/phone-02.jpg';
import phone03 from '../assets/images/phone-03.png';
import phone04 from '../assets/images/phone-04.jpg';
import phone05 from '../assets/images/phone-05.jpg';
import phone06 from '../assets/images/phone-06.jpg';

import watch01 from '../assets/images/watch-01.jpg';
import watch02 from '../assets/images/watch-02.jpg';
import watch03 from '../assets/images/watch-03.jpg';
import watch04 from '../assets/images/watch-04.jpg';

import wireless01 from '../assets/images/wireless-01.png';
import wireless02 from '../assets/images/wireless-02.png';
import wireless03 from '../assets/images/wireless-03.png';

export const mockProducts: Product[] = [
  // SOFAS
  {
    id: 'sofa-01',
    name: 'Westview Modern Double Sofa',
    category: 'sofa',
    price: 199,
    originalPrice: 249,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    isBestSeller: true,
    image: sofa01,
    images: [sofa01, singleSofa01, singleSofa02],
    colors: ['Charcoal Gray', 'Navy Blue', 'Warm Cream'],
    sizes: ['2-Seater', '3-Seater', 'Sectional L'],
    shortDesc: 'Crafted with premium high-density foam and stain-resistant woven upholstery.',
    description: 'The Westview Modern Double Sofa brings contemporary luxury to your living space. Designed with clean architectural lines, deep supportive seating, and durable woven fabric engineered for daily family life.',
    specifications: {
      'Dimensions': '84"W x 38"D x 34"H',
      'Frame Material': 'Kiln-dried FSC Certified Hardwood',
      'Upholstery': 'Performance Polyester-Linen Blend',
      'Weight Capacity': '750 lbs',
      'Warranty': '10-Year Structural Frame'
    },
    tags: ['furniture', 'living room', 'sofa', 'minimalist', 'bestseller'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Eleanor Vance',
        rating: 5,
        date: '2026-02-14',
        comment: 'Extremely comfortable! The fabric is soft yet durable, and assembly took under 15 minutes.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Marcus Chen',
        rating: 4.5,
        date: '2026-01-28',
        comment: 'Great value for the price. Fits seamlessly in our open-plan living room.',
        verified: true
      }
    ]
  },
  {
    id: 'sofa-02',
    name: 'Bigelow Scandinavian Velvet Couch',
    category: 'sofa',
    price: 259,
    originalPrice: 320,
    discountPercent: 19,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    image: sofa02,
    images: [sofa02, sofa03],
    colors: ['Emerald Forest', 'Royal Indigo', 'Oatmeal Beige'],
    sizes: ['3-Seater', '4-Seater'],
    shortDesc: 'Luxurious velvet sofa featuring tapered brass metal legs and plush cushioning.',
    description: 'Elevate your interior aesthetics with the Bigelow Scandinavian Couch. Wrapped in jewel-toned stain-resistant velvet with high-resilience memory foam filling for supreme relaxation.',
    specifications: {
      'Dimensions': '88"W x 36"D x 32"H',
      'Legs': 'Brushed Solid Brass',
      'Upholstery': 'Ultra-soft Velvet',
      'Seat Depth': '24 inches'
    },
    tags: ['furniture', 'velvet', 'scandinavian', 'luxury'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Sophia Rossi',
        rating: 5,
        date: '2026-02-02',
        comment: 'The velvet feel is extraordinary and the color is even richer in person!',
        verified: true
      }
    ]
  },
  {
    id: 'sofa-03',
    name: 'Amazon Brand Rivet Revolve Sofa',
    category: 'sofa',
    price: 185,
    originalPrice: 220,
    discountPercent: 15,
    rating: 4.6,
    reviewCount: 29,
    inStock: true,
    stockCount: 19,
    image: sofa03,
    images: [sofa03, singleSofa03],
    colors: ['Heather Gray', 'Caramel Tan'],
    sizes: ['Compact 2-Seater', 'Standard 3-Seater'],
    shortDesc: 'Streamlined design with tapered hardwood legs and clean modern tufting.',
    description: 'Practical, chic, and sturdy. The Rivet Revolve Sofa is crafted for urban apartments and modern family rooms where style and resilience meet.',
    specifications: {
      'Dimensions': '80"W x 35"D x 35"H',
      'Frame': 'Engineered Wood & Pine',
      'Fabric': '100% Textured Weave'
    },
    tags: ['furniture', 'sofa', 'compact', 'contemporary'],
    reviews: [
      {
        id: 'rev-4',
        author: 'David K.',
        rating: 4.5,
        date: '2026-01-15',
        comment: 'Very solid build and very easy to keep clean with pets.',
        verified: true
      }
    ]
  },
  {
    id: 'sofa-04',
    name: 'Fluffy Accent Lounge Single Armchair',
    category: 'sofa',
    price: 139,
    originalPrice: 169,
    discountPercent: 18,
    rating: 4.7,
    reviewCount: 24,
    inStock: true,
    stockCount: 11,
    isNewArrival: true,
    image: singleSofa01,
    images: [singleSofa01, singleSofa04],
    colors: ['Oatmeal', 'Mustard Gold', 'Sage Green'],
    sizes: ['Standard Lounge'],
    shortDesc: 'Cozy single-seat lounger designed for reading nooks and accent styling.',
    description: 'A statement single sofa piece with curved ergonomic contours, plush armrests, and premium micro-bouclé texture.',
    specifications: {
      'Dimensions': '36"W x 34"D x 33"H',
      'Cushioning': 'High-Density Pocket Spring',
      'Care': 'Spot clean with mild fabric cleaner'
    },
    tags: ['furniture', 'armchair', 'lounge', 'reading corner'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Chloe M.',
        rating: 5,
        date: '2026-02-19',
        comment: 'My favorite chair in the house. Super plush!',
        verified: true
      }
    ]
  },
  {
    id: 'sofa-05',
    name: 'Minimalist Studio Single Sofa',
    category: 'sofa',
    price: 119,
    originalPrice: 149,
    discountPercent: 20,
    rating: 4.4,
    reviewCount: 17,
    inStock: true,
    stockCount: 5,
    image: singleSofa02,
    images: [singleSofa02, singleSofa03],
    colors: ['Charcoal', 'Ivory'],
    sizes: ['One Size'],
    shortDesc: 'Clean geometric lines with pocket spring core support.',
    description: 'Ideal accent piece for bedrooms, home offices, and cozy studio apartments.',
    specifications: {
      'Dimensions': '32"W x 32"D x 30"H',
      'Weight': '38 lbs'
    },
    tags: ['furniture', 'chair', 'compact'],
    reviews: []
  },

  // CHAIRS
  {
    id: 'chair-01',
    name: 'Baltsar Ergonomic Wingback Armchair',
    category: 'chair',
    price: 89,
    originalPrice: 119,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    isBestSeller: true,
    image: chair01,
    images: [chair01, chair02],
    colors: ['Cognac Leather', 'Ash Gray', 'Midnight Blue'],
    sizes: ['Standard', 'High Back'],
    shortDesc: 'Mid-century modern wingback armchair with lumbar support and solid beechwood legs.',
    description: 'Engineered for exceptional ergonomic comfort and enduring beauty. The Baltsar armchair features high-resilience memory foam and curved contours.',
    specifications: {
      'Height': '39 inches',
      'Seat Width': '22 inches',
      'Weight Capacity': '320 lbs',
      'Material': 'Supple PU Leather / Beechwood'
    },
    tags: ['chair', 'armchair', 'office', 'reading', 'bestseller'],
    reviews: [
      {
        id: 'rev-6',
        author: 'Harrison T.',
        rating: 5,
        date: '2026-02-10',
        comment: 'Looks like a $500 designer piece! Sturdy and extremely comfortable for long hours.',
        verified: true
      }
    ]
  },
  {
    id: 'chair-02',
    name: 'Helmar Tufted Accent Lounge Chair',
    category: 'chair',
    price: 109,
    originalPrice: 139,
    discountPercent: 21,
    rating: 4.7,
    reviewCount: 31,
    inStock: true,
    stockCount: 15,
    isNewArrival: true,
    image: chair02,
    images: [chair02, chair03],
    colors: ['Ochre Yellow', 'Slate Blue', 'Dusty Rose'],
    sizes: ['Standard'],
    shortDesc: 'Plush button-tufted backrest with matte black steel framing.',
    description: 'The Helmar Lounge Chair effortlessly bridges industrial minimalism with cozy mid-century warmth.',
    specifications: {
      'Dimensions': '30"W x 31"D x 34"H',
      'Base': 'Matte Black Powder-Coated Steel'
    },
    tags: ['chair', 'accent', 'lounge', 'tufted'],
    reviews: []
  },
  {
    id: 'chair-03',
    name: 'Nordic Oak & Linen Dining Chair',
    category: 'chair',
    price: 79,
    originalPrice: 99,
    discountPercent: 20,
    rating: 4.6,
    reviewCount: 22,
    inStock: true,
    stockCount: 28,
    image: chair03,
    images: [chair03, chair01],
    colors: ['Natural Oak / Sand', 'Walnut / Charcoal'],
    sizes: ['Single', 'Set of 2', 'Set of 4'],
    shortDesc: 'Solid natural oak dining and study chair with cushioned linen seat pad.',
    description: 'Clean Scandinavian styling crafted for daily dinners, kitchen islands, or modern workspaces.',
    specifications: {
      'Wood': '100% Solid European White Oak',
      'Seat Height': '18.5 inches'
    },
    tags: ['chair', 'dining', 'scandinavian', 'oak'],
    reviews: []
  },

  // MOBILE DEVICES
  {
    id: 'mobile-01',
    name: 'Apple iPhone 15 Pro Max',
    category: 'mobile',
    price: 1199,
    originalPrice: 1299,
    discountPercent: 8,
    rating: 4.9,
    reviewCount: 145,
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    isBestSeller: true,
    image: phone01,
    images: [phone01, phone02, phone03],
    colors: ['Natural Titanium', 'Blue Titanium', 'Black Titanium', 'White Titanium'],
    sizes: ['256GB', '512GB', '1TB'],
    shortDesc: 'A17 Pro chip, Aerospace-grade titanium design, 48MP main camera with 5x optical zoom.',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system yet with ProRAW and 4K ProRes video capture.',
    specifications: {
      'Display': '6.7-inch Super Retina XDR with ProMotion 120Hz',
      'Processor': 'A17 Pro 3nm Silicon',
      'Camera': '48MP Main + 12MP Ultra-Wide + 12MP 5x Telephoto',
      'Battery': 'Up to 29 hours video playback',
      'Port': 'USB-C with USB 3 speeds (up to 10Gbps)'
    },
    tags: ['mobile', 'smartphone', 'apple', 'flagship', 'pro'],
    reviews: [
      {
        id: 'rev-7',
        author: 'Nathan Drake',
        rating: 5,
        date: '2026-02-21',
        comment: 'The titanium build feels unbelievably light. Incredible cameras and battery life!',
        verified: true
      },
      {
        id: 'rev-8',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '2026-02-11',
        comment: 'USB-C is finally here. Fast charging and blazing performance.',
        verified: true
      }
    ]
  },
  {
    id: 'mobile-02',
    name: 'Apple iPhone 15',
    category: 'mobile',
    price: 799,
    originalPrice: 849,
    discountPercent: 6,
    rating: 4.8,
    reviewCount: 92,
    inStock: true,
    stockCount: 25,
    isNewArrival: true,
    image: phone02,
    images: [phone02, phone04],
    colors: ['Pink', 'Blue', 'Green', 'Yellow', 'Black'],
    sizes: ['128GB', '256GB', '512GB'],
    shortDesc: 'Dynamic Island, 48MP main camera, color-infused glass and aluminum design.',
    description: 'Featuring the Dynamic Island, 48MP Main camera with 2x optical quality telephoto, and USB-C connectivity.',
    specifications: {
      'Display': '6.1-inch Super Retina XDR OLED',
      'Processor': 'A16 Bionic',
      'Camera': '48MP + 12MP Dual Setup',
      'Connector': 'USB-C'
    },
    tags: ['mobile', 'smartphone', 'apple', 'dynamic island'],
    reviews: []
  },
  {
    id: 'mobile-03',
    name: 'Apple iPhone 14 Pro',
    category: 'mobile',
    price: 699,
    originalPrice: 899,
    discountPercent: 22,
    rating: 4.7,
    reviewCount: 88,
    inStock: true,
    stockCount: 12,
    image: phone03,
    images: [phone03, phone05],
    colors: ['Deep Purple', 'Space Black', 'Gold', 'Silver'],
    sizes: ['128GB', '256GB', '512GB'],
    shortDesc: 'A16 Bionic processor, 48MP camera, Always-On display, and Dynamic Island.',
    description: 'A pro powerhouse featuring ceramic shield protection, Crash Detection, and all-day battery life.',
    specifications: {
      'Display': '6.1-inch OLED ProMotion',
      'Chip': 'A16 Bionic',
      'Water Resistance': 'IP68 (6m up to 30 mins)'
    },
    tags: ['mobile', 'apple', 'smartphone', 'deal'],
    reviews: []
  },
  {
    id: 'mobile-04',
    name: 'Google Pixel 8 Pro AI Edition',
    category: 'mobile',
    price: 749,
    originalPrice: 899,
    discountPercent: 17,
    rating: 4.7,
    reviewCount: 64,
    inStock: true,
    stockCount: 16,
    isFeatured: true,
    image: phone04,
    images: [phone04, phone06],
    colors: ['Bay Blue', 'Obsidian', 'Porcelain'],
    sizes: ['128GB', '256GB'],
    shortDesc: 'Google Tensor G3, Best-in-class computational photography with Gemini AI Magic Editor.',
    description: 'The AI powerhouse. Super Actua display, thermometer sensor, Best Take, Audio Magic Eraser, and 7 years of OS updates.',
    specifications: {
      'Display': '6.7-inch Super Actua 1-120Hz LTPO',
      'Chip': 'Google Tensor G3 + Titan M2',
      'Camera': '50MP Octa PD + 48MP Ultrawide + 48MP 5x Quad PD',
      'OS Support': '7 Years Guaranteed Android & Security Updates'
    },
    tags: ['mobile', 'google', 'pixel', 'ai', 'camera'],
    reviews: []
  },
  {
    id: 'mobile-05',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'mobile',
    price: 1099,
    originalPrice: 1299,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 110,
    inStock: true,
    stockCount: 9,
    isBestSeller: true,
    image: phone05,
    images: [phone05, phone06],
    colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet'],
    sizes: ['256GB', '512GB'],
    shortDesc: 'Galaxy AI with Circle to Search, Snapdragon 8 Gen 3, S-Pen included.',
    description: 'Titanium shield armor, quad telephoto system, generative photo editing, and built-in S-Pen stylus productivity.',
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X 2600 nits',
      'Chip': 'Snapdragon 8 Gen 3 for Galaxy',
      'Stylus': 'Embedded Bluetooth S-Pen'
    },
    tags: ['mobile', 'samsung', 'galaxy', 'ai', 'stylus'],
    reviews: []
  },
  {
    id: 'mobile-06',
    name: 'OnePlus 12 Flagship',
    category: 'mobile',
    price: 649,
    originalPrice: 799,
    discountPercent: 19,
    rating: 4.6,
    reviewCount: 45,
    inStock: true,
    stockCount: 14,
    image: phone06,
    images: [phone06, phone01],
    colors: ['Flowy Emerald', 'Silky Black'],
    sizes: ['256GB', '512GB'],
    shortDesc: '100W SuperVOOC ultra-fast charging, 4th Gen Hasselblad Camera, 5400mAh battery.',
    description: 'Uncompromising speed. Go from 1% to 100% in 26 minutes with proprietary dual-cell fast charging.',
    specifications: {
      'Display': '6.82-inch 2K ProXDR 120Hz',
      'Charging': '100W Wired + 50W Wireless',
      'Battery': '5400 mAh dual-cell'
    },
    tags: ['mobile', 'fast-charging', 'hasselblad'],
    reviews: []
  },

  // WATCHES
  {
    id: 'watch-01',
    name: 'Apple Watch Ultra 2 Titanium',
    category: 'watch',
    price: 399,
    originalPrice: 499,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 84,
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    isBestSeller: true,
    image: watch01,
    images: [watch01, watch02],
    colors: ['Titanium / Orange Alpine Loop', 'Titanium / Blue Ocean Band'],
    sizes: ['49mm'],
    shortDesc: 'The ultimate sports and adventure watch. Precision dual-frequency GPS and 36-hr battery.',
    description: 'Rugged titanium case, sapphire crystal front glass, 3000-nit display, depth gauge to 40m, and dual-frequency GPS.',
    specifications: {
      'Case Size': '49mm Aerospace Titanium',
      'Water Resistance': '100 meters (EN13319 certified)',
      'Brightness': 'Up to 3,000 nits'
    },
    tags: ['watch', 'smartwatch', 'apple', 'fitness', 'rugged'],
    reviews: [
      {
        id: 'rev-9',
        author: 'Liam Vance',
        rating: 5,
        date: '2026-02-18',
        comment: 'Battery lasts nearly 3 full days for me. Brightness in direct sunlight is mind-blowing.',
        verified: true
      }
    ]
  },
  {
    id: 'watch-02',
    name: 'Apple Watch Series 9 GPS + Cellular',
    category: 'watch',
    price: 299,
    originalPrice: 349,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    stockCount: 20,
    isNewArrival: true,
    image: watch02,
    images: [watch02, watch03],
    colors: ['Midnight', 'Starlight', 'Silver', '(PRODUCT)RED'],
    sizes: ['41mm', '45mm'],
    shortDesc: 'S9 SiP chip, Double Tap gesture, brighter Always-On display, ECG and Blood Oxygen.',
    description: 'Smarter, brighter, mightier. Control your watch without touching the screen using Double Tap magic gesture.',
    specifications: {
      'Display': 'Always-On Retina up to 2000 nits',
      'Chip': 'S9 SiP with 4-core Neural Engine',
      'Sensors': 'ECG, Blood Oxygen, Temperature Sensing'
    },
    tags: ['watch', 'apple', 'smartwatch', 'health'],
    reviews: []
  },
  {
    id: 'watch-03',
    name: 'Garmin Fenix 7 Pro Solar',
    category: 'watch',
    price: 349,
    originalPrice: 429,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 49,
    inStock: true,
    stockCount: 11,
    image: watch03,
    images: [watch03, watch04],
    colors: ['Slate Gray / Black', 'Carbon Gray DLC'],
    sizes: ['47mm Standard', '51mm Solar Edition'],
    shortDesc: 'Multisport GPS watch with solar charging lens, built-in LED flashlight, and topo maps.',
    description: 'Conquer every hour with advanced training features, 24/7 health tracking, and weeks of battery life powered by solar tech.',
    specifications: {
      'Battery Life': 'Up to 22 days in smartwatch mode with solar',
      'Flashlight': 'Built-in multi-LED flashlight',
      'Maps': 'Preloaded TopoActive maps'
    },
    tags: ['watch', 'garmin', 'gps', 'solar', 'fitness'],
    reviews: []
  },
  {
    id: 'watch-04',
    name: 'Samsung Galaxy Watch 6 Classic',
    category: 'watch',
    price: 249,
    originalPrice: 299,
    discountPercent: 17,
    rating: 4.6,
    reviewCount: 38,
    inStock: true,
    stockCount: 17,
    image: watch04,
    images: [watch04, watch01],
    colors: ['Black', 'Silver'],
    sizes: ['43mm', '47mm'],
    shortDesc: 'Physical rotating bezel, personalized heart rate zones, advanced sleep coaching.',
    description: 'Classic analog styling with modern smart power. The rotating stainless-steel bezel makes navigation fluid and intuitive.',
    specifications: {
      'Material': 'Stainless Steel & Sapphire Glass',
      'Bezel': 'Tactile Rotating Bezel',
      'OS': 'Wear OS powered by Samsung'
    },
    tags: ['watch', 'samsung', 'smartwatch', 'classic'],
    reviews: []
  },

  // WIRELESS AUDIO
  {
    id: 'wireless-01',
    name: 'Sony WH-1000XM5 Noise Canceling Headphones',
    category: 'wireless',
    price: 199,
    originalPrice: 249,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    stockCount: 22,
    isFeatured: true,
    isBestSeller: true,
    image: wireless01,
    images: [wireless01, wireless02],
    colors: ['Silver Platinum', 'Midnight Black', 'Smoky Navy'],
    sizes: ['Over-Ear'],
    shortDesc: 'Industry-leading Active Noise Cancellation with dual processors and 8 microphones.',
    description: 'Redefining distraction-free listening. Auto NC Optimizer automatically tunes noise cancelation according to wearing conditions and environment. 30-hour battery life with 3-minute ultra-quick charge.',
    specifications: {
      'Driver Unit': '30mm Carbon Fiber composite dome',
      'Battery Life': '30 hours (ANC On) / 40 hours (ANC Off)',
      'Bluetooth': 'v5.2 with LDAC High-Res Audio Wireless',
      'Weight': '250 grams'
    },
    tags: ['audio', 'wireless', 'headphones', 'anc', 'sony', 'bestseller'],
    reviews: [
      {
        id: 'rev-10',
        author: 'Grace Hopper',
        rating: 5,
        date: '2026-02-23',
        comment: 'Best noise cancellation on airplanes and offices. Mic quality is crystal clear.',
        verified: true
      },
      {
        id: 'rev-11',
        author: 'Carlos Santana',
        rating: 5,
        date: '2026-02-05',
        comment: 'Soundstage is crisp with deep, controlled bass.',
        verified: true
      }
    ]
  },
  {
    id: 'wireless-02',
    name: 'Bose QuietComfort Ultra Spatial Audio',
    category: 'wireless',
    price: 229,
    originalPrice: 279,
    discountPercent: 18,
    rating: 4.8,
    reviewCount: 78,
    inStock: true,
    stockCount: 13,
    isNewArrival: true,
    image: wireless02,
    images: [wireless02, wireless03],
    colors: ['Black', 'White Smoke', 'Sandstone'],
    sizes: ['Over-Ear'],
    shortDesc: 'Immersive spatial audio, custom acoustic tuning, and world-class quiet mode.',
    description: 'Bose Immersive Audio pushes the boundaries of what it means to listen. It spatializes what you’re hearing, taking music out of your head and placing it right in front of you.',
    specifications: {
      'Audio Mode': 'Quiet, Aware, and Immersion modes',
      'Battery': 'Up to 24 hours per charge',
      'Audio Codecs': 'aptX Adaptive, AAC, SBC'
    },
    tags: ['audio', 'bose', 'wireless', 'spatial-audio'],
    reviews: []
  },
  {
    id: 'wireless-03',
    name: 'Apple AirPods Max Space Gray',
    category: 'wireless',
    price: 349,
    originalPrice: 429,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    stockCount: 9,
    image: wireless03,
    images: [wireless03, wireless01],
    colors: ['Space Gray', 'Silver', 'Sky Blue', 'Pink', 'Green'],
    sizes: ['Over-Ear'],
    shortDesc: 'Custom acoustic design, H1 chip in each cup, breathable knit mesh canopy.',
    description: 'High-fidelity audio meets industry-leading Active Noise Cancellation. Each part of their custom driver works to produce sound with ultra-low distortion across the audible range.',
    specifications: {
      'Chips': 'Apple H1 headphone chip (each ear cup)',
      'Microphones': 'Nine microphones total',
      'Smart Case': 'Ultra-low power preservation state'
    },
    tags: ['audio', 'apple', 'airpods', 'premium', 'wireless'],
    reviews: [
      {
        id: 'rev-12',
        author: 'Daniel Craig',
        rating: 5,
        date: '2026-01-30',
        comment: 'The build quality with stainless steel and aluminum is second to none.',
        verified: true
      }
    ]
  }
];

export const productCategories = [
  { id: 'all', name: 'All Products', count: mockProducts.length, icon: 'LayoutGrid' },
  { id: 'sofa', name: 'Sofas & Couches', count: mockProducts.filter(p => p.category === 'sofa').length, icon: 'Armchair' },
  { id: 'chair', name: 'Chairs & Lounge', count: mockProducts.filter(p => p.category === 'chair').length, icon: 'RockingChair' },
  { id: 'mobile', name: 'Smartphones & Tech', count: mockProducts.filter(p => p.category === 'mobile').length, icon: 'Smartphone' },
  { id: 'watch', name: 'Smart Watches', count: mockProducts.filter(p => p.category === 'watch').length, icon: 'Watch' },
  { id: 'wireless', name: 'Audio & Wireless', count: mockProducts.filter(p => p.category === 'wireless').length, icon: 'Headphones' },
] as const;

export const validCoupons: Record<string, { discountPercent: number; description: string }> = {
  'SAVE20': { discountPercent: 20, description: '20% OFF Site-Wide Spring Discount' },
  'EAZY10': { discountPercent: 10, description: '10% OFF Welcome Bonus' },
  'FLASH30': { discountPercent: 30, description: '30% OFF Flash Sale Special' },
};
