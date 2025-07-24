'use client';

import { useOrderBookStore } from '@/store/useOrderBookStore';
import ExportSnapshotButton from './ExportSnapshotButton';

export default function OrderBookPanel() {
  const {
    bids,
    asks,
    selectedVenues,
    imbalance,
    recentBidIds,
    recentAskIds,
  } = useOrderBookStore();

  const filteredBids = selectedVenues.length
    ? bids.filter((b) => selectedVenues.includes(b.venue))
    : bids;

  const filteredAsks = selectedVenues.length
    ? asks.filter((a) => selectedVenues.includes(a.venue))
    : asks;

  const totalBidVolume = filteredBids.reduce((acc, b) => acc + b.size, 0);
  const totalAskVolume = filteredAsks.reduce((acc, a) => acc + a.size, 0);
  const maxBidSize =
    filteredBids.length > 0 ? Math.max(...filteredBids.map((b) => b.size)) : 0;
  const maxAskSize =
    filteredAsks.length > 0 ? Math.max(...filteredAsks.map((a) => a.size)) : 0;

  return (
    <div
      id="orderbook-panel"
      className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-2xl shadow-md w-full max-w-5xl mx-auto"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        📊 Order Book Panel
      </h2>

      {/* Bids & Asks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bids */}
        <div>
          <h3 className="text-green-500 text-lg font-semibold mb-2 text-center">
            Bids
          </h3>
          <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
            {filteredBids.map((bid, index) => {
              const id = `${bid.price}-${bid.size}`;
              const isNew = recentBidIds.has(id);
              return (
                <div
                  key={index}
                  className={`flex justify-between px-3 py-1 rounded transition-all duration-300 text-sm
                    ${
                      bid.isPressureZone
                        ? 'bg-yellow-500/20 border border-yellow-400 text-yellow-100 dark:text-yellow-200'
                        : 'bg-gray-200 dark:bg-gray-800'
                    }
                    ${
                      bid.size === maxBidSize
                        ? 'outline outline-1 outline-green-500'
                        : ''
                    }
                    ${isNew ? 'animate-flash' : ''}`}
                >
                  <span>${bid.price.toFixed(2)}</span>
                  <span>{bid.size.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Asks */}
        <div>
          <h3 className="text-red-500 text-lg font-semibold mb-2 text-center">
            Asks
          </h3>
          <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
            {filteredAsks.map((ask, index) => {
              const id = `${ask.price}-${ask.size}`;
              const isNew = recentAskIds.has(id);
              return (
                <div
                  key={index}
                  className={`flex justify-between px-3 py-1 rounded transition-all duration-300 text-sm
                    ${
                      ask.isPressureZone
                        ? 'bg-yellow-500/20 border border-yellow-400 text-yellow-100 dark:text-yellow-200'
                        : 'bg-gray-200 dark:bg-gray-800'
                    }
                    ${
                      ask.size === maxAskSize
                        ? 'outline outline-1 outline-red-500'
                        : ''
                    }
                    ${isNew ? 'animate-flash' : ''}`}
                >
                  <span>${ask.price.toFixed(2)}</span>
                  <span>{ask.size.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <div className="flex justify-between">
          <span>Total Bid Volume:</span>
          <span className="text-green-500">{totalBidVolume.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Ask Volume:</span>
          <span className="text-red-500">{totalAskVolume.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Max Bid Size:</span>
          <span className="text-green-400">{maxBidSize.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Max Ask Size:</span>
          <span className="text-red-400">{maxAskSize.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Orderbook Imbalance:</span>
          <span
            className={`font-semibold ${
              imbalance > 1.1
                ? 'text-green-500'
                : imbalance < 0.9
                ? 'text-red-500'
                : 'text-yellow-400'
            }`}
          >
            {imbalance.toFixed(2)}{' '}
            {imbalance > 1
              ? '(Buy Pressure)'
              : imbalance < 1
              ? '(Sell Pressure)'
              : '(Balanced)'}
          </span>
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-6 flex justify-center">
        <ExportSnapshotButton />
      </div>
    </div>
  );
}
