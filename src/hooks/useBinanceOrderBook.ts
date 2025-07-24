import { useEffect } from 'react';
import { useOrderBookStore } from '@/store/useOrderBookStore';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@depth';

export function useBinanceOrderBook() {
  const updateOrderBook = useOrderBookStore((s) => s.updateOrderBook);

  useEffect(() => {
    const ws = new WebSocket(BINANCE_WS_URL);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const bids = (data.b || []).map(([p, q]: [string, string]) => ({
        price: parseFloat(p),
        size: parseFloat(q),
        side: 'bid' as const,
      }));

      const asks = (data.a || []).map(([p, q]: [string, string]) => ({
        price: parseFloat(p),
        size: parseFloat(q),
        side: 'ask' as const,
      }));

      updateOrderBook([...bids, ...asks]);
    };

    ws.onerror = console.error;
    return () => ws.close();
  }, [updateOrderBook]);
}
