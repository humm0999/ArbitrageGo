'use client';

import React from 'react';
import { CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_DEX } from '@/lib/mock-data';
import { Flame, ArrowRight, PlaySquare } from 'lucide-react';

interface DexArbitrageViewProps {
  currency: CurrencyCode;
}

export function DexArbitrageView({ currency }: DexArbitrageViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Decentralized Exchange (DEX) Scanner</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              On-Chain Liquidity Pools
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare Automated Market Maker (AMM) pools across Ethereum, Solana, BNB Chain, Polygon, Arbitrum, and Base.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Network</th>
              <th className="p-3">Token</th>
              <th className="p-3">Buy DEX</th>
              <th className="p-3">Sell DEX</th>
              <th className="p-3">Gross Spread</th>
              <th className="p-3">Gas Cost</th>
              <th className="p-3">Price Impact</th>
              <th className="p-3">Est. Net Profit</th>
              <th className="p-3">Net ROI</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
            {MOCK_DEX.map((dex) => (
              <tr key={dex.id} className="hover:bg-slate-50 transition">
                <td className="p-3">
                  <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {dex.network}
                  </span>
                </td>
                <td className="p-3 font-extrabold text-slate-900">{dex.token}</td>
                <td className="p-3">
                  <span className="font-semibold block">{dex.buyDex}</span>
                  <span className="text-[11px] text-slate-500">{formatCurrency(dex.buyPrice, currency)}</span>
                </td>
                <td className="p-3">
                  <span className="font-semibold block">{dex.sellDex}</span>
                  <span className="text-[11px] text-slate-500">{formatCurrency(dex.sellPrice, currency)}</span>
                </td>
                <td className="p-3 font-bold text-slate-900">+{dex.grossSpreadPct}%</td>
                <td className="p-3 text-slate-500">{formatCurrency(dex.gasCostUSD, currency)}</td>
                <td className="p-3 text-slate-500">{dex.priceImpactPct}%</td>
                <td className="p-3 font-extrabold text-emerald-600">
                  {formatCurrency(dex.estimatedNetProfitUSD, currency)}
                </td>
                <td className="p-3 font-extrabold text-emerald-700">+{dex.netRoiPct}%</td>
                <td className="p-3 text-right">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition">
                    Simulate Swap
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
