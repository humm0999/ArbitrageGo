'use client';

import React from 'react';
import { CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { BarChart3, TrendingUp, Zap, Clock } from 'lucide-react';

interface AnalyticsViewProps {
  currency: CurrencyCode;
}

export function AnalyticsView({ currency }: AnalyticsViewProps) {
  return (
    <div className="space-y-6 text-[#0A192F]">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0A192F]">Market Analytics & Execution Velocity</h1>
          <p className="text-xs text-gray-500 mt-1">
            Historical spread distributions, exchange latency performance, and slippage benchmarks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Avg Execution Delay</span>
          <span className="text-2xl font-black text-[#0A192F] block mt-1">42 ms</span>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">-8ms vs last week</span>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Average Spread Captured</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">+1.84%</span>
          <span className="text-[11px] text-gray-500 font-medium block mt-0.5">Over 1,240 trades</span>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Slippage Retention</span>
          <span className="text-2xl font-black text-[#0A192F] block mt-1">94.2%</span>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">High liquidity fill rate</span>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Win Rate (Paper)</span>
          <span className="text-2xl font-black text-emerald-600 block mt-1">98.5%</span>
          <span className="text-[11px] text-gray-500 font-medium block mt-0.5">Positive net outcome</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
          <h3 className="font-bold text-[#0A192F] text-sm uppercase tracking-wider mb-4">
            Spread Distribution by Exchange Pair
          </h3>
          <div className="space-y-3 text-xs">
            {[
              { pair: 'Binance → Kraken', spread: '1.42%', count: '412 opps', share: '35%' },
              { pair: 'OKX → Bybit', spread: '2.10%', count: '284 opps', share: '24%' },
              { pair: 'Coinbase → Binance', spread: '0.95%', count: '210 opps', share: '18%' },
              { pair: 'Gate.io → KuCoin', spread: '3.15%', count: '180 opps', share: '15%' },
            ].map((row) => (
              <div key={row.pair} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#0A192F] block">{row.pair}</span>
                  <span className="text-[10px] text-gray-500">{row.count}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-emerald-600 block">{row.spread}</span>
                  <span className="text-[10px] text-gray-400">{row.share} volume</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A192F] text-white border border-blue-900 rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-blue-400 text-xs uppercase tracking-widest mb-4">
            Network Gas & Order Book Depth Sensitivity
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed mb-4">
            Order book slippage increases exponentially when trade capital exceeds $25,000 on mid-cap DEX pools. Our dynamic smart order router splits order routes when depth threshold is crossed.
          </p>
          <div className="p-4 bg-blue-900/40 rounded-lg border border-blue-800 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Optimal Single Order Cap:</span>
              <span className="font-bold text-white">$15,000 USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Recommended Routing Legs:</span>
              <span className="font-bold text-white">2 - 3 Exchanges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
