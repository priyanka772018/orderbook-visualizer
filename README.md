This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or# 📊 Orderbook Depth 3D Visualizer

A real-time interactive 3D cryptocurrency orderbook visualization tool built using **Next.js**, **Three.js**, and **React Three Fiber**. This app visualizes price, quantity, and time across multiple venues using dynamic 3D bars and heatmaps. It supports **dark/light mode**, real-time updates, and pressure zone analysis.

## 🚀 Features

- 🔁 Real-time 3D orderbook with rotation and zoom
- 🔴 Ask (red) and 🟢 Bid (green) bars representing depth
- 🎛️ Manual camera controls: zoom, pan, rotate
- 📈 Cumulative volume by price level
- 🔥 Pressure zone detection and heatmap overlay
- 🏷️ Venue filtering (Binance, OKX, etc.)
- 🌓 Light/Dark theme toggle
- 📊 Order flow analytics panel
- 📱 Fully responsive (mobile, tablet, desktop)

## 🧠 Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Three.js](https://threejs.org/) via [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Zustand for state management
- TailwindCSS for styling
- Chart.js & D3 for analytics overlays

---

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Installation

```bash
git clone https://github.com/priyanka772018/orderbook-visualizer.git
cd orderbook-visualizer
npm install

pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
