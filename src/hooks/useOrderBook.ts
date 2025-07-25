// hooks/useOrderBook.ts

import { useEffect } from "react";
import { useOrderBookStore } from "@/store/useOrderBookStore";
import { OrderBookEntry } from "@/types";

const venues = ["Binance", "Bybit", "Kraken", "Coinbase"];

function markPressureZones(entries: OrderBookEntry[], topPercent = 10): OrderBookEntry[] {
  const sorted = [...entries].sort((a, b) => b.size - a.size);
  const count = Math.ceil((topPercent / 100) * sorted.length);
  const threshold = sorted[count - 1]?.size || 0;

  return entries.map((entry) => ({
    ...entry,
    isPressureZone: entry.size >= threshold,
  }));
}

export const useOrderBook = () => {
  const setBids = useOrderBookStore((state) => state.setBids);
  const setAsks = useOrderBookStore((state) => state.setAsks);
  const setImbalance = useOrderBookStore((state) => state.setImbalance);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomBids: OrderBookEntry[] = Array.from({ length: 10 }, () => ({
        price: parseFloat((Math.random() * 100).toFixed(2)),
        size: parseFloat((Math.random() * 5).toFixed(2)),
        venue: venues[Math.floor(Math.random() * venues.length)],
        side: 'bid',
      }));

      const randomAsks: OrderBookEntry[] = Array.from({ length: 10 }, () => ({
        price: parseFloat((Math.random() * 100).toFixed(2)),
        size: parseFloat((Math.random() * 5).toFixed(2)),
        venue: venues[Math.floor(Math.random() * venues.length)],
        side: 'ask',
      }));

      const markedBids = markPressureZones(randomBids);
      const markedAsks = markPressureZones(randomAsks);

      const bidTotal = markedBids.reduce((sum, entry) => sum + entry.size, 0);
      const askTotal = markedAsks.reduce((sum, entry) => sum + entry.size, 0);
      const imbalance = askTotal === 0 ? 1 : bidTotal / askTotal;

      setBids(markedBids);
      setAsks(markedAsks);
      setImbalance(imbalance);
    }, 1000);

    return () => clearInterval(interval);
  }, [setBids, setAsks, setImbalance]);
};
