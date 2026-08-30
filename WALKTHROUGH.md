# 📖 Walkthrough: EazyKart - React 19 Modern E-Commerce Platform

A production-grade, highly-responsive modern e-commerce marketplace built on **React 19, TypeScript Strict Mode, Vite 6, and Tailwind CSS v3.4**.

---

## 💡 React 19 Architectural Highlights

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

  HTML --> Router
  Router --> StateLayer
  StateLayer --> ResourceLayer
  ResourceLayer --> UILayer
```

---

## 🔄 Core Optimistic Cart Flow

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

## 🧪 Verification & Feature Validation

| Feature | Primitive / Technique | Verification Result |
| :--- | :--- | :--- |
| **Instant Cart Feedback** | `useOptimistic` + `startTransition` | Immediate quantity adjustment with 0ms visual lag |
| **Form Processing** | `useActionState` | Native form submission, error handling, receipt generator |
| **Data Fetching** | `use(promise)` + `<Suspense>` | Shimmer skeleton screens during initial catalog hydrate |
| **Faceted Filtering** | Custom Filter Engine | Instant filtering across Category, Price, Rating, and Stock |

---

## 🚀 How to Run

```powershell
cd "C:\Users\Admin\.gemini\antigravity-ide\scratch\New folder\EazyKart"

# Install dependencies if needed
npm install

# Start Vite dev server
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)**.
