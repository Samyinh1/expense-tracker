# ExpenseIQ – Smart Expense Tracker

A modern, interactive expense tracking dashboard built with **React.js** and **JavaScript**. Designed as a portfolio project showcasing reusable component architecture, state management, dynamic data visualization, and polished UI/UX.

---

## What We Built

### Overview

A single-page application (SPA) that lets users track their income and expenses in real time. Features an interactive dashboard with live charts, a 3D animated credit card, skeleton loading states, and full CRUD functionality — all persisted to `localStorage`.

---

## Features

### Interactive Dashboard
- Greeting header that changes based on time of day (morning / afternoon / evening)
- Date context displayed in the top-right header
- Fully responsive layout using CSS Grid and Flexbox

### Stat Cards (4 KPI tiles)
- **Total Balance** — computed from all income minus all expenses
- **Total Income** — sum of all income transactions
- **Total Expenses** — sum of all expense transactions
- **Savings Rate** — percentage of income saved, shown as `%`
- Each card has a gradient background, decorative orbs, and a trend badge (↑ / ↓ with percentage)

### 3D Animated Credit Card
- Built with pure CSS `perspective()` and `rotateX / rotateY` transforms
- **Mouse-tracking tilt** — card physically tilts toward your cursor on hover
- Floating idle animation using CSS `@keyframes float`
- Features: chip, contactless icon, masked card number, cardholder name, expiry, VISA branding
- Grid-line texture overlay using inline SVG pattern
- Mini income/expense tiles beneath the card

### Data Visualization (Recharts)
- **Donut Chart** — spending breakdown by category with percentage progress bars and color legend
- **Monthly Bar Chart** — side-by-side Income vs Expenses bars grouped by month
- **Balance Trend Area Chart** — running cumulative balance plotted over time with gradient fill
- All charts use a custom dark tooltip and `ResponsiveContainer` for fluid sizing

### Transaction List
- **Search** — live filter by title or category name
- **Filter tabs** — All / Income / Expense
- **Edit** — click any row to open the pre-filled edit modal
- **Delete** — inline ✕ button with confirmation prompt
- Category color chips and icons on each row
- Shows count of filtered vs total transactions

### Add / Edit Transaction Modal
- **Type toggle** — Income or Expense (switches available categories)
- **Category picker** — pill-style buttons with emoji icons; auto-resets when type changes
- **Form fields** — Title, Amount (₹), Date, Note
- **Validation** — inline error messages for empty/invalid fields
- Animated entry with `scaleIn` keyframe
- Backdrop blur overlay

### Skeleton Loading UI
- 1.8-second simulated loading phase on initial render
- Shimmer animation (`background-position` sweep) on placeholder shapes
- Skeletons match exact layout of real content:
  - Stat card skeletons (4 tiles)
  - Chart card skeletons
  - Transaction list skeleton (rows with icon, text, amount placeholders)
  - Category list skeleton

### Dark Sidebar Navigation
- Fixed sidebar (`260px`) with radial gradient glow accents
- Active nav item highlighted with left border + background tint
- Sections: Main Menu (Dashboard, Transactions, Analytics, Budget, Accounts) and General (Settings, Notifications)
- User avatar with initials, name, and role
- Collapses to icon-only on screens below `900px`

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 (functional components, hooks) |
| Build Tool | Vite 5 |
| Charts | Recharts 2 |
| Styling | Pure CSS (variables, Grid, Flexbox, animations) |
| State | `useReducer` + `localStorage` persistence |
| Font | Inter (Google Fonts) |

---

## State Management

Used `useReducer` at the root `App.jsx` level with three action types:

```js
ADD    // prepends a new transaction
EDIT   // updates an existing transaction by id
DELETE // removes a transaction by id
```

Every dispatch auto-saves to `localStorage` so data survives page refresh. On first load, 20 seed transactions are injected across June and May 2024 as demo data.

---

## Component Architecture

```
App.jsx                        ← root: state, layout, modal control
├── Sidebar.jsx                ← fixed nav with active state
├── StatCard.jsx               ← reusable gradient KPI tile
├── CreditCard3D.jsx           ← interactive 3D card with mouse tilt
├── Charts.jsx
│   ├── DonutChart             ← category spending breakdown
│   ├── MonthlyBarChart        ← monthly income vs expenses
│   └── BalanceTrendChart      ← cumulative balance over time
├── TransactionList.jsx        ← search, filter, edit, delete
├── AddTransactionModal.jsx    ← add/edit form with validation
└── Skeleton.jsx
    ├── SkeletonStatCards      ← 4-tile shimmer placeholder
    ├── SkeletonCard           ← generic chart placeholder
    ├── SkeletonTransactionList← row-by-row shimmer list
    └── SkeletonCategoryList   ← category breakdown placeholder
```

---

## Project Structure

```
expense-tracker/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Sidebar.jsx
        ├── StatCard.jsx
        ├── CreditCard3D.jsx
        ├── Charts.jsx
        ├── TransactionList.jsx
        ├── AddTransactionModal.jsx
        └── Skeleton.jsx
```

---

## Running Locally

```bash
cd expense-tracker
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Resume Bullet Points

- Built an interactive expense tracking dashboard using **React.js** with reusable components and `useReducer` state management, persisted to `localStorage`
- Applied dynamic data visualization using **Recharts** (donut, bar, area charts) to improve financial tracking and user experience
- Implemented a **3D animated credit card** with CSS `perspective()` transforms and real-time mouse-tracking tilt effect
- Designed **skeleton loading UI** with shimmer animations that mirror real content layout, reducing perceived load time
- Built full **CRUD transaction management** with live search, category filters, and an animated modal with client-side form validation
