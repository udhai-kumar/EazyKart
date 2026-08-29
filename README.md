# ⚡ EazyKart - React 19 Modern E-Commerce Platform

A production-grade, highly-responsive, modern e-commerce marketplace built on **React 19, TypeScript Strict Mode, Vite 6, and Tailwind CSS v3.4**.

Featuring native **React 19 primitives** (`useActionState`, `useOptimistic`, `use(promise)`, `<Suspense>`, direct `ref` props, native document metadata), dark/light theme styling, faceted filtering, slide-over cart drawer with free-shipping metrics, and instantaneous checkout.

---

## 📐 System Architecture

```mermaid
graph TB
  subgraph ClientLayer ["1. Client & Presentation Layer"]
    HTML["index.html (Vite Entry)"]
    Theme["Theme Toggle (Dark / Light)"]
    Metadata["Native React 19 Document Metadata (<title>, <meta>)"]
    Router["AppRoutes (React Router v7 / Browser History)"]
  end

  subgraph StateLayer ["2. React 19 State & Context Layer"]
    CartContext["CartContext (useActionState + useOptimistic)"]
    WishlistContext["WishlistContext (useOptimistic)"]
    ToastContext["ToastContext (Micro-Alerts)"]
    ThemeContext["ThemeContext (System/LocalStorage Persistence)"]
  end

  subgraph ResourceLayer ["3. React 19 Resource & Suspense Layer"]
    SuspenseBoundary["<Suspense> Boundaries"]
    UsePromise["React 19 use(promise) Hook"]
    Skeletons["ProductSkeleton (Shimmer Fallback)"]
    PromiseCache["ProductService Promise Resolution & Cache"]
  end

  subgraph UILayer ["4. Component & Feature Layer"]
    Header["Sticky Header + Live Search (Cmd/K) + Cart Badge"]
    HeroBanner["Hero Banner (Seasonal Slider & Category Pills)"]
    ProductCards["ProductCard (Direct ref, Quick Add, Wishlist Heart)"]
    QuickViewModal["QuickViewModal (Variant Pickers & Tabs)"]
    FilterSidebar["FilterSidebar (Faceted Categories, Price Slider, Ratings)"]
    CartDrawer["Slide-Over Cart Drawer (Free Shipping Bar, Coupons)"]
    CheckoutModal["CheckoutModal (React 19 Form Actions, Receipt)"]
    Footer["Footer (Newsletter, Trust Badges, Customer Care)"]
  end

  subgraph DataLayer ["5. Strongly-Typed Data & Domain Layer"]
    ProductsData["products.ts (Enriched Mock Catalog, Specs, Reviews)"]
    TypeDefs["ecommerce.ts (TypeScript Interfaces & Discriminated Unions)"]
  end

  HTML --> Router
  Router --> StateLayer
  StateLayer --> ResourceLayer
  ResourceLayer --> UILayer
  UILayer --> DataLayer
```

---

## 🔄 Core Flow Diagrams

### 1. React 19 Optimistic Cart Flow

```mermaid
sequenceDiagram
  autonumber
  actor User as Shopper
  participant UI as ProductCard / QuickView
  participant Opt as useOptimistic (Cart State)
  participant Action as useActionState (cartReducer)
  participant Storage as LocalStorage

  User->>UI: Clicks "Add to Cart" / Adjusts Quantity (+/-)
  activate UI
  UI->>Opt: startTransition -> setOptimisticCart(action)
  activate Opt
  Note over Opt: UI updates IMMEDIATELY (0ms lag)
  Opt-->>User: Visual feedback, badge bounce & toast notification
  deactivate Opt

  UI->>Action: dispatchCartAction(action)
  activate Action
  Action->>Action: Pure synchronous cartReducer calculation
  Action->>Storage: Persist { items, discountCode }
  Action-->>Opt: Synchronize confirmed state
  deactivate Action
  deactivate UI
```

---

### 2. Form Action & Instant Checkout Flow

```mermaid
sequenceDiagram
  autonumber
  actor User as Shopper
  participant Drawer as Cart Drawer
  participant Modal as CheckoutModal
  participant FormAction as useActionState (Checkout Action)
  participant CartCtx as CartContext

  User->>Drawer: Clicks "Proceed to Checkout"
  Drawer->>Modal: Opens Checkout Modal
  User->>Modal: Fills Shipping & Selects Payment
  User->>Modal: Clicks "Place Order & Pay"

  activate Modal
  Modal->>FormAction: Native Form Action dispatch(formData)
  activate FormAction
  FormAction->>FormAction: Validates inputs & generates Order Receipt
  FormAction->>CartCtx: clearCart()
  FormAction-->>Modal: Returns { status: 'success', order: OrderReceipt }
  deactivate FormAction

  Modal-->>User: Displays Order Confirmation Receipt with Tracking #
  deactivate Modal
```

---

### 3. React 19 `<Suspense>` & `use(promise)` Resource Fetching

```mermaid
flowchart TD
  Start([Page Render: Home / Shop / ProductDetails]) --> CreatePromise[Create Memoized Resource Promise]
  CreatePromise --> SuspenseCheck{Promise Resolved?}

  SuspenseCheck -- "Pending" --> RenderSkeleton["Render <ProductSkeleton /> (Shimmer Fallback)"]
  SuspenseCheck -- "Resolved" --> UseHook["React 19 use(promise) extracts Data"]

  UseHook --> RenderGrid["Render <ProductGrid /> / Product Cards"]
  RenderSkeleton -.-> SuspenseCheck
```

---

### 4. Shopper Navigation & User Journey Flow

```mermaid
flowchart LR
  Home["Home Page\n(Hero, Promos, Curated Picks)"] --> Search["Live Search Modal\n(Cmd/Ctrl + K Autocomplete)"]
  Home --> Shop["Faceted Shop Page\n(Filters, Sort, View Modes)"]
  
  Search --> Details["Product Details Page\n(Specs, Reviews Form Action)"]
  Shop --> QuickView["Quick-View Modal\n(Variant Pickers)"]
  Shop --> Details

  QuickView --> Cart["Slide-Over Cart Drawer\n(Free Shipping Progress, Coupons)"]
  Details --> Cart
  Shop --> Cart

  Cart --> Checkout["Checkout Modal\n(React 19 Form Action)"]
  Checkout --> Receipt["Order Confirmation\n(Order ID, Tracking #)"]
```

---

## 🛠️ Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | React 19 (`react@^19.0.0`) | Native `useActionState`, `useOptimistic`, `use(promise)`, `<Suspense>`, Direct `ref` props, Native Metadata |
| **Language** | TypeScript 5.7+ | Strict typing, `noUnusedLocals: true`, `noUnusedParameters: true` |
| **Bundler** | Vite 6 | Lightning-fast HMR and optimized production chunking |
| **Styling** | Tailwind CSS v3.4 + PostCSS | Dark mode (`class` strategy), glassmorphism, responsive utilities |
| **Icons** | Lucide React | Modern, lightweight SVG iconography |
| **Routing** | React Router v7 | Seamless client-side routing and smooth scroll resets |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation & Run

```bash
# 1. Clone or navigate to the project directory
cd EazyKart

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Server ready at http://localhost:3000

# 4. Run TypeScript strict typecheck
npm run typecheck

# 5. Build for production
npm run build
```

---

## 🏷️ Test Coupons
- `SAVE20`: 20% OFF Site-Wide Spring Discount
- `EAZY10`: 10% OFF Welcome Bonus
- `FLASH30`: 30% OFF Flash Sale Special

---

## 📄 License
Licensed under the [MIT License](LICENSE).