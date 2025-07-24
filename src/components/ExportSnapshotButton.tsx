'use client';

import { useOrderBookStore } from '@/store/useOrderBookStore';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({ children, onClick, className = '' }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
  >
    {children}
  </button>
);

export default function ExportSnapshotButton() {
  const bids = useOrderBookStore((state) => state.bids || []);
  const asks = useOrderBookStore((state) => state.asks || []);
  const pressureZones = useOrderBookStore((state) => state.pressureZones || []);
  const imbalance = useOrderBookStore((state) => state.imbalance || 0);
  const selectedVenues = useOrderBookStore((state) => state.selectedVenues || []);
  const venue = selectedVenues.length > 0 ? selectedVenues[0] : 'Unknown';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const downloadImage = (canvasData: any) => {
  // do something
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getVolume = (entry: any) => entry.volume ?? entry.size ?? 0;
  const totalBidVolume = bids.reduce((sum, b) => sum + getVolume(b), 0);
  const totalAskVolume = asks.reduce((sum, a) => sum + getVolume(a), 0);

  const handleExportJSON = () => {
    const snapshot = {
      timestamp: new Date().toISOString(),
      venue,
      totalBidVolume,
      totalAskVolume,
      imbalance,
      pressureZones: pressureZones.map((p) => ({
        price: p.price,
        volume: getVolume(p),
        type: p.type,
      })),
      topBids: bids.slice(0, 5).map((b) => ({
        price: b.price,
        volume: getVolume(b),
      })),
      topAsks: asks.slice(0, 5).map((a) => ({
        price: a.price,
        volume: getVolume(a),
      })),
    };

    const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
      type: 'application/json',
    });

    saveAs(blob, `orderbook_snapshot_${venue}_${Date.now()}.json`);
  };

  const handleExportPNG = async () => {
    const panel = document.getElementById('orderbook-panel');
    if (!panel) {
      alert('Orderbook panel not found');
      return;
    }

    try {
      // Optional: temporarily force dark background for snapshot clarity
      panel.classList.add('snapshot-exporting');
      await new Promise((res) => setTimeout(res, 100)); // allow DOM update

      const canvas = await html2canvas(panel, {
        backgroundColor: '#1f2937', // Tailwind gray-900 fallback
        useCORS: true,
        scale: 2,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `orderbook_snapshot_${venue}_${Date.now()}.png`);
        }
      });

      panel.classList.remove('snapshot-exporting');
    } catch (error) {
      console.error('PNG Export Error:', error);
      alert('Error capturing snapshot. Please try again.');
    }
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button onClick={handleExportJSON}>📤 Export Snapshot (JSON)</Button>
      <Button onClick={handleExportPNG} className="bg-green-600 hover:bg-green-700">
        🖼️ Export Snapshot (PNG)
      </Button>
    </div>
  );
}
