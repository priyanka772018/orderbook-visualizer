"use client";

export default function PressureZoneLegend() {
  return (
    <div className="mt-4 text-sm text-white bg-gray-900/90 p-5 rounded-lg shadow-md border border-gray-700 w-full">
      <h3 className="text-white font-semibold mb-4 text-base">📊 Depth Heatmap Legend</h3>

      <div className="space-y-3">
        {/* Buy Pressure Legend */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-4 bg-green-200 rounded-sm" />
          <span>Low Buy Volume</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-4 bg-green-500 rounded-sm" />
          <span>Medium Buy Volume</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-4 bg-green-800 rounded-sm" />
          <span>High Buy Volume</span>
        </div>

        {/* Sell Pressure Legend */}
        <div className="border-t border-gray-600 pt-3 mt-3" />

        <div className="flex items-center gap-3">
          <div className="w-6 h-4 bg-red-200 rounded-sm" />
          <span>Low Sell Volume</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-4 bg-red-500 rounded-sm" />
          <span>Medium Sell Volume</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-4 bg-red-800 rounded-sm" />
          <span>High Sell Volume</span>
        </div>
      </div>
    </div>
  );
}
