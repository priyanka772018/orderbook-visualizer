// src/types/index.ts

/** A single orderbook level (bid or ask) */
export type OrderBookEntry = {
  side: 'bid' | 'ask';           // strictly 'bid' or 'ask'
  price: number;                 // price level
  size: number;                  // quantity at that level
  venue: string;                 // exchange or venue identifier
  isPressureZone?: boolean;      // flagged by your pressure-zone logic
  pressureType?: 'bid' | 'ask';  // if isPressureZone, which side
  detectedAt?: number;           // timestamp for when zone was detected
};

/** Data passed into your tooltip component on hover */
export type TooltipData = {
  price: number;
  size: number;
  venue: string;
  x: number;   // screen x-coordinate
  y: number;   // screen y-coordinate
};

/** A high-pressure zone in the book */
export type PressureZone = {
  type: 'bid' | 'ask';
  price: number;
  size: number;
  timestamp: number;
};
