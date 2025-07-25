"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useOrderBookStore } from "@/store/useOrderBookStore";
import TooltipOverlay from "@/components/TooltipOverlay";
import { scaleLinear } from "d3-scale";
import * as THREE from "three";
import { useMemo } from "react";
import { OrderBookEntry } from "@/types";

type BarProps = {
  entry: OrderBookEntry;
  isBid: boolean;
  index: number;
  colorScale: (val: number) => string;
};

function Bar({ entry, isBid, index, colorScale }: BarProps) {
  const setTooltip = useOrderBookStore((s) => s.setTooltip);

  const hexColor = colorScale(entry.size);
  const emissiveColor = new THREE.Color(hexColor).multiplyScalar(0.3);

  return (
    <mesh
      position={[isBid ? -1 : 1, index * 0.3, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        const canvas = document.getElementById("canvas-container");
        const rect = canvas?.getBoundingClientRect();

        setTooltip({
          price: entry.price,
          size: entry.size,
          venue: entry.venue,
          x: e.clientX - (rect?.left ?? 0),
          y: e.clientY - (rect?.top ?? 0),
        });
      }}
      onPointerOut={() => setTooltip(null)}
    >
      <boxGeometry args={[entry.size, 0.25, 0.2]} />
      <meshStandardMaterial
        color={hexColor}
        emissive={emissiveColor}
        emissiveIntensity={Math.min(entry.size / 50, 1)}
        transparent
        opacity={0.9}
        toneMapped={false}
      />
    </mesh>
  );
}

function Scene() {
  const { bids, asks } = useOrderBookStore();

  const [minBidSize, maxBidSize] = useMemo(() => {
    if (!bids.length) return [0, 1];
    const sizes = bids.map((e) => e.size);
    return [0, Math.max(...sizes)];
  }, [bids]);

  const [minAskSize, maxAskSize] = useMemo(() => {
    if (!asks.length) return [0, 1];
    const sizes = asks.map((e) => e.size);
    return [0, Math.max(...sizes)];
  }, [asks]);

  const bidColorScale = useMemo(() => {
    return scaleLinear<string>()
      .domain([minBidSize, maxBidSize])
      .range(["#ccffcc", "#006600"]); // light to dark green
  }, [minBidSize, maxBidSize]);

  const askColorScale = useMemo(() => {
    return scaleLinear<string>()
      .domain([minAskSize, maxAskSize])
      .range(["#ffcccc", "#660000"]); // light to dark red
  }, [minAskSize, maxAskSize]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1.5} />
      <pointLight position={[2, 5, 2]} intensity={1.2} />

      {bids.map((entry, i) => (
        <Bar
          key={`bid-${i}`}
          entry={entry}
          isBid={true}
          index={i}
          colorScale={bidColorScale}
        />
      ))}

      {asks.map((entry, i) => (
        <Bar
          key={`ask-${i}`}
          entry={entry}
          isBid={false}
          index={i}
          colorScale={askColorScale}
        />
      ))}

      <OrbitControls />
    </>
  );
}

export default function OrderBookCanvas() {
  return (
    <div id="canvas-container" className="relative h-full w-full">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <Scene />
      </Canvas>
      <TooltipOverlay />
    </div>
  );
}
