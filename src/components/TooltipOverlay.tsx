"use client";

import { useOrderBookStore } from "@/store/useOrderBookStore";

export default function TooltipOverlay() {
  const tooltip = useOrderBookStore((state) => state.tooltip);

  if (!tooltip) return null;

  return (
    <div
      className="absolute bg-black text-white text-xs px-2 py-1 rounded shadow"
      style={{
        left: tooltip.x,
        top: tooltip.y,
        transform: "translate(-50%, -100%)",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div>Price: ${tooltip.price.toFixed(2)}</div>
      <div>Size: {tooltip.size.toFixed(2)}</div>
      <div>Venue: {tooltip.venue}</div>
    </div>
  );
}
