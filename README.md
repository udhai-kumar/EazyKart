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
    Metadata["Native React 19 Document Metadata"]
    Router["AppRoutes (React Router v7)"]
  end

  subgraph StateLayer ["2. React 19 State & Context Layer"]
    CartContext["CartContext (useActionState + useOptimistic)"]
    WishlistContext["WishlistContext (useOptimistic)"]
    ToastContext["ToastContext (Micro-Alerts)"]
    ThemeContext["ThemeContext (LocalStorage Persistence)"]
  end

  subgraph ResourceLayer ["3. React 19 Resource & Suspense Layer"]
    SuspenseBoundary["Suspense Boundaries"]
    UsePromise["React 19 use(promise) Hook"]
    Skeletons["ProductSkeleton (Shimmer Fallback)"]
    PromiseCache["ProductService Promise Cache"]
  end

  subgraph UILayer ["4. Component & Feature Layer"]
    Header["Sticky Header + Search (Cmd/K) + Cart Badge"]
    HeroBanner["Hero Banner (Seasonal Slider & Category Pills)"]
    ProductCards["ProductCard (Direct ref, Quick Add, Wishlist)"]
    QuickViewModal["QuickViewModal (Variant Pickers & Tabs)"]
    FilterSidebar["FilterSidebar (Faceted Filters)"]
    CartDrawer["CartDrawer (Free Shipping Bar, Coupons)"]
    CheckoutModal["CheckoutModal (Form Actions, Receipt)"]
    Footer["Footer (Newsletter, Trust Badges)"]
  end

  subgraph DataLayer ["5. Strongly-Typed Data & Domain Layer"]
    ProductsData["products.ts (Enriched Mock Catalog)"]
    TypeDefs["ecommerce.ts (TypeScript Interfaces)"]
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
  participant UI as "ProductCard / QuickView"
  participant OptimisticState as "useOptimistic (Cart State)"
  participant ActionReducer as "useActionState (Cart Reducer)"
  participant Storage as "LocalStorage"

  User->>UI: Clicks "Add to Cart" or Quantity Stepper (+/-)
  activate UI
  UI->>OptimisticState: startTransition with setOptimisticCart(action)
  activate OptimisticState
  Note over OptimisticState: UI updates IMMEDIATELY (0ms lag)
  OptimisticState-->>User: Visual feedback, badge bounce & toast notification
  deactivate OptimisticState

  UI->>ActionReducer: dispatchCartAction(action)
  activate ActionReducer
  ActionReducer->>ActionReducer: Pure synchronous cartReducer calculation
  ActionReducer->>Storage: Persist items and coupon code
  ActionReducer-->>OptimisticState: Synchronize confirmed state
  deactivate ActionReducer
  deactivate UI
```

---

### 2. Form Action & Instant Checkout Flow

```mermaid
sequenceDiagram
  autonumber
  actor User as Shopper
  participant Drawer as "Slide-Over Cart Drawer"
  participant Modal as "Checkout Modal"
  participant FormAction as "useActionState (Checkout Action)"
  participant CartCtx as "Cart Context"

  User->>Drawer: Clicks "Proceed to Checkout"
  Drawer->>Modal: Opens Checkout Modal
  User->>Modal: Fills Shipping & Selects Payment
  User->>Modal: Clicks "Place Order & Pay"

  activate Modal
  Modal->>FormAction: Form action dispatches FormData
  activate FormAction
  FormAction->>FormAction: Validates inputs & generates Order Receipt
  FormAction->>CartCtx: clearCart()
  FormAction-->>Modal: Returns success status and OrderReceipt
  deactivate FormAction

  Modal-->>User: Displays Order Confirmation Receipt with Tracking Number
  deactivate Modal
```

---

### 3. React 19 `<Suspense>` & `use(promise)` Resource Fetching

```mermaid
flowchart TD
  Start([Page Render: Home / Shop / ProductDetails]) --> CreatePromise["Create Memoized Resource Promise"]
  CreatePromise --> SuspenseCheck{"Promise Resolved?"}

  SuspenseCheck -- "Pending" --> RenderSkeleton["Render ProductSkeleton (Shimmer Fallback)"]
  SuspenseCheck -- "Resolved" --> UseHook["React 19 use(promise) extracts Data"]

  UseHook --> RenderGrid["Render ProductGrid / Product Cards"]
  RenderSkeleton -.-> SuspenseCheck
```

---

### 4. Shopper Navigation & User Journey Flow

```mermaid
flowchart LR
  Home["Home Page (Hero, Promos)"] --> Search["Live Search Modal (Cmd/K)"]
  Home --> Shop["Faceted Shop (Filters, Sorter)"]
  
  Search --> Details["Product Details (Specs, Reviews)"]
  Shop --> QuickView["Quick-View Modal (Variants)"]
  Shop --> Details

  QuickView --> Cart["Slide-Over Cart Drawer"]
  Details --> Cart
  Shop --> Cart

  Cart --> Checkout["Checkout Modal (Form Action)"]
  Checkout --> Receipt["Order Confirmation (Order ID & Tracking #)"]
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