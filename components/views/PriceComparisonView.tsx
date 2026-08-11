'use client';

import React, { useState } from 'react';
import { CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_EXCHANGES, getMockOrderBook } from '@/lib/mock-data';
import { Scale, Search, ArrowUpRight, ArrowDownRight, Layers, Clock } from 'lucide-react';

interface PriceComparisonViewProps {
  currency: CurrencyCode;
}

export function PriceComparisonView({ currency }: PriceComparisonViewProps) {
  const [pair, setPair] = useState('BTC/USDT');
  const [search, setSearch] = useState('');

  const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'DOGE/USDT', 'ADA/USDT'];

  const basePrice = pair.startsWith('BTC')
    ? 94500
    : pair.startsWith('ETH')
    ? 2700
    : pair.startsWith('SOL')
    ? 184
    : pair.startsWith('XRP')
    ? 2.40
    : pair.startsWith('DOGE')
    ? 0.25
    : 0.84;

  // Generate realistic price comparisons across exchanges
  const exchangePrices = MOCK_EXCHANGES.map((ex, idx) => {
    const variance = (idx - 4.5) * 0.0025; // price spread variation
    const bid = Number((basePrice * (1 + variance - 0.001)).toFixed(2));
    const ask = Number((basePrice * (1 + variance + 0.001)).toFixed(2));
    const spreadPct = Number((((ask - bid) / ask) * 100).toFixed(2));

    return {
      exchange: ex.name,
      bid,
      ask,
      last: Number(((bid + ask) / 2).toFixed(2)),
      volume24hUSD: Math.round(15000000 + idx * 8500000),
      liquidityUSD: Math.round(250000 + idx * 75000),
      spreadPct,
      dataAgeSeconds: Number((0.2 + idx * 0.1).toFixed(1)),
      status: ex.status,
    };
  });

  // Find lowest ask (Lowest executable buy price) and highest bid (Highest executable sell price)
  const lowestAsk = Math.min(...exchangePrices.map((p) => p.ask));
  const highestBid = Math.max(...exchangePrices.map((p) => p.bid));
  const grossSpreadPct = Number((((highestBid - lowestAsk) / lowestAsk) * 100).toFixed(2));

  const orderBooks = getMockOrderBook(pair);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Price Comparison Engine</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Cross-Exchange Bids & Asks
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Lowest executable Ask highlighted in <span className="font-bold text-emerald-600">Green</span>. Highest executable Bid in <span className="font-bold text-blue-600">Blue</span>.
          </p>
        </div>

        {/* Pair Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {pairs.map((p) => (
            <button
              key={p}
              onClick={() => setPair(p)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                pair === p
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Highlights Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
            LOWEST EXECUTABLE ASK (BUY LOW)
          </span>
          <span className="text-2xl font-black text-emerald-800 block mt-1">
            {formatCurrency(lowestAsk, currency)}
          </span>
          <span className="text-xs text-emerald-700 font-medium block mt-0.5">
            On {exchangePrices.find((p) => p.ask === lowestAsk)?.exchange}
          </span>
        </div>

        <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl">
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
            HIGHEST EXECUTABLE BID (SELL HIGH)
          </span>
          <span className="text-2xl font-black text-blue-800 block mt-1">
            {formatCurrency(highestBid, currency)}
          </span>
          <span className="text-xs text-blue-700 font-medium block mt-0.5">
            On {exchangePrices.find((p) => p.bid === highestBid)?.exchange}
          </span>
        </div>

        <div className="p-5 bg-slate-900 text-white rounded-2xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            MAX GROSS PRICE SPREAD
          </span>
          <span className="text-2xl font-black text-emerald-400 block mt-1">
            +{grossSpreadPct}%
          </span>
          <span className="text-xs text-slate-300 block mt-0.5">
            Gross Diff: {formatCurrency(highestBid - lowestAsk, currency)}
          </span>
        </div>
      </div>

      {/* Main Exchange Price Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-4">{pair} Real-Time Exchange Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-3">Exchange</th>
                <th className="p-3">Bid (Sell)</th>
                <th className="p-3">Ask (Buy)</th>
                <th className="p-3">Last Price</th>
                <th className="p-3">24h Volume</th>
                <th className="p-3">Liquidity Depth</th>
                <th className="p-3">Inner Spread</th>
                <th className="p-3">Data Age</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {exchangePrices.map((row) => {
                const isLowestAsk = row.ask === lowestAsk;
                const isHighestBid = row.bid === highestBid;

                return (
                  <tr key={row.exchange} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-extrabold text-slate-900">{row.exchange}</td>
                    <td
                      className={`p-3 font-bold ${
                        isHighestBid ? 'bg-blue-100 text-blue-900 font-black rounded-lg' : 'text-slate-900'
                      }`}
                    >
                      {formatCurrency(row.bid, currency)}
                    </td>
                    <td
                      className={`p-3 font-bold ${
                        isLowestAsk ? 'bg-emerald-100 text-emerald-900 font-black rounded-lg' : 'text-slate-900'
                      }`}
                    >
                      {formatCurrency(row.ask, currency)}
                    </td>
                    <td className="p-3 text-slate-600">{formatCurrency(row.last, currency)}</td>
                    <td className="p-3 text-slate-500">{formatCurrency(row.volume24hUSD, currency, 0)}</td>
                    <td className="p-3 text-slate-500">{formatCurrency(row.liquidityUSD, currency, 0)}</td>
                    <td className="p-3 text-slate-500">{row.spreadPct}%</td>
                    <td className="p-3 text-slate-400">{row.dataAgeSeconds}s</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
