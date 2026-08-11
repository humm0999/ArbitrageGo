'use client';

import React from 'react';
import { CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_FUNDING } from '@/lib/mock-data';
import { TrendingUp } from 'lucide-react';

interface FundingArbitrageViewProps {
  currency: CurrencyCode;
}

export function FundingArbitrageView({ currency }: FundingArbitrageViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Funding Rate & Basis Yield Scanner</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Cash & Carry Strategies
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Hedge Spot crypto against Perpetual Futures contracts to collect 8-hour funding rate yields with minimal directional market exposure.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Asset</th>
              <th className="p-3">Exchange</th>
              <th className="p-3">Spot Price</th>
              <th className="p-3">Futures Price</th>
              <th className="p-3">Basis Spread</th>
              <th className="p-3">8h Funding Rate</th>
              <th className="p-3">Annualized Yield</th>
              <th className="p-3">Est. Net Return</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
            {MOCK_FUNDING.map((fund) => (
              <tr key={fund.id} className="hover:bg-slate-50 transition">
                <td className="p-3 font-extrabold text-slate-900">{fund.asset}</td>
                <td className="p-3 font-semibold">{fund.exchange}</td>
                <td className="p-3 text-slate-700">{formatCurrency(fund.spotPrice, currency)}</td>
                <td className="p-3 text-slate-700">{formatCurrency(fund.futuresPrice, currency)}</td>
                <td className="p-3 text-emerald-700 font-bold">+{formatCurrency(fund.basisUSD, currency)}</td>
                <td className="p-3 font-bold text-blue-600">+{fund.fundingRate8hPct}% / 8h</td>
                <td className="p-3 font-black text-emerald-600">+{fund.annualizedYieldPct}% APY</td>
                <td className="p-3 font-extrabold text-emerald-700">
                  {formatCurrency(fund.estimatedNetProfitUSD, currency)}
                </td>
                <td className="p-3 text-right">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition">
                    Hedge Position
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
