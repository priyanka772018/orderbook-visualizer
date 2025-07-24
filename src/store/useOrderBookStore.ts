import { create } from 'zustand';
import { OrderBookEntry, TooltipData } from '@/types';

type PressureZone = {
  type: 'bid' | 'ask';
  price: number;
  size: number;
  timestamp: number;
};

type OrderBookStore = {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  tooltip: TooltipData | null;
  selectedVenues: string[];

  pressureZones: PressureZone[];
  imbalance: number;

  recentBidIds: Set<string>;
  recentAskIds: Set<string>;

  setBids: (bids: OrderBookEntry[]) => void;
  setAsks: (asks: OrderBookEntry[]) => void;
  setTooltip: (tooltip: TooltipData | null) => void;
  setSelectedVenues: (venues: string[]) => void;
  setPressureZones: (zones: PressureZone[]) => void;
  setImbalance: (imbalance: number) => void;
  updateRecentOrders: (bids: OrderBookEntry[], asks: OrderBookEntry[]) => void;

  // ✅ NEW
  updateOrderBook: (levels: OrderBookEntry[]) => void;
};

export const useOrderBookStore = create<OrderBookStore>((set) => ({
  bids: [],
  asks: [],
  tooltip: null,
  selectedVenues: [],
  pressureZones: [],
  imbalance: 1,

  recentBidIds: new Set<string>(),
  recentAskIds: new Set<string>(),

  setBids: (bids) => set({ bids }),
  setAsks: (asks) => set({ asks }),
  setTooltip: (tooltip) => set({ tooltip }),
  setSelectedVenues: (venues) => set({ selectedVenues: venues }),
  setPressureZones: (zones) => set({ pressureZones: zones }),
  setImbalance: (imbalance) => set({ imbalance }),

  updateRecentOrders: (bids, asks) => {
    const newBidIds = new Set(bids.map((b) => `${b.price}-${b.size}`));
    const newAskIds = new Set(asks.map((a) => `${a.price}-${a.size}`));
    set({ recentBidIds: newBidIds, recentAskIds: newAskIds });
  },

  // ✅ Unified update function for real-time WebSocket
  updateOrderBook: (levels) => {
    const bids = levels
      .filter((lvl) => lvl.side === 'bid')
      .sort((a, b) => b.price - a.price);
    const asks = levels
      .filter((lvl) => lvl.side === 'ask')
      .sort((a, b) => a.price - b.price);

    const newBidIds = new Set(bids.map((b) => `${b.price}-${b.size}`));
    const newAskIds = new Set(asks.map((a) => `${a.price}-${a.size}`));

    const bidVolume = bids.reduce((sum, b) => sum + b.size, 0);
    const askVolume = asks.reduce((sum, a) => sum + a.size, 0);
    const imbalance = askVolume === 0 ? 1 : bidVolume / askVolume;

    set({
      bids,
      asks,
      recentBidIds: newBidIds,
      recentAskIds: newAskIds,
      imbalance: imbalance,
    });
  },
}));
