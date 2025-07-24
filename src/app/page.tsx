"use client";

import dynamic from "next/dynamic";
import OrderBookPanel from "@/components/OrderBookPanel";
import VenueFilter from "@/components/VenueFilter";
import PressureZoneLegend from "@/components/PressureZoneLegend";
import { useOrderBook } from "@/hooks/useOrderBook";
import ThemeToggle from "@/components/ThemeToggle";

const OrderBookCanvas = dynamic(() => import("@/components/OrderBookCanvas"), {
  ssr: false,
});

export default function Home() {
  useOrderBook();

  return (
    <main className="p-6 flex flex-col items-center gap-6 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-extrabold drop-shadow-lg animate-fade-in">
          📈 3D Orderbook Depth Visualizer
        </h1>
        <ThemeToggle />
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6 w-full animate-fade-in">
        <div className="flex-1 h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-black">
          <OrderBookCanvas />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-96">
          <OrderBookPanel />
          <VenueFilter />
          <PressureZoneLegend />
        </div>
      </div>
    </main>
  );
}


