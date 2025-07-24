"use client";

import { useOrderBookStore } from "@/store/useOrderBookStore";

const venues = ["Binance", "Coinbase", "Kraken"];

export default function VenueFilter() {
  const selectedVenues = useOrderBookStore((state) => state.selectedVenues);
  const setSelectedVenues = useOrderBookStore((state) => state.setSelectedVenues);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "All") {
      setSelectedVenues([]); // no filtering
    } else {
      setSelectedVenues([value]); // filter to selected
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow w-full max-w-md">
      <h3 className="text-white font-medium mb-2">Venue Filter</h3>
      <select
        value={selectedVenues[0] || "All"}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-700 text-white"
      >
        <option value="All">All</option>
        {venues.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}
