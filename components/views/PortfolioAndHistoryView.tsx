'use client';

import React from 'react';
import { CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_PAPER_TRADES, MOCK_EXCHANGES } from '@/lib/mock-data';
import { PieChart, History, CheckCircle2 } from 'lucide-react';

interface PortfolioAndHistoryViewProps {
  currency: CurrencyCode;
  mode: 'portfolio' | 'history';
}

export function PortfolioAndHistoryView({ currency, mode }: PortfolioAndHistoryViewProps) {
  if (mode === 'portfolio') {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Portfolio & Exchange Balances</h1>
            <p className="text-xs text-slate-500 mt-1">Multi-exchange asset distribution and realized P/L.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl">
            <span className="text-xs font-bold text-slate-500 uppercase block">Total Asset Value</span>
            <span className="text-2xl font-black text-slate-900 block mt-1">
              {formatCurrency(124850, currency)}
            </span>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-2xl">
            <span className="text-xs font-bold text-slate-500 uppercase block">Available Free Margin</span>
            <span className="text-2xl font-black text-slate-900 block mt-1">
              {formatCurrency(84120, currency)}
            </span>
          </div>
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <span className="text-xs font-bold text-emerald-800 uppercase block">Cumulative Realized P/L</span>
            <span className="text-2xl font-black text-emerald-700 block mt-1">
              +{formatCurrency(4850, currency)} (+4.04%)
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-base mb-4">Exchange Balance Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {MOCK_EXCHANGES.slice(0, 3).map((ex) => (
              <div key={ex.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-bold text-slate-900 text-sm block">{ex.name}</span>
                <span className="text-slate-500 block mt-0.5">Status: {ex.status}</span>
                <span className="text-base font-extrabold text-slate-900 block mt-2">
                  {formatCurrency(35000 + (ex.id.charCodeAt(0) % 10) * 1000, currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Trade Execution History</h1>
          <p className="text-xs text-slate-500 mt-1">Comprehensive audit log of paper, manual, and automated trades.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
              <th className="p-3">Date</th>
              <th className="p-3">Asset</th>
              <th className="p-3">Route</th>
              <th className="p-3">Capital</th>
              <th className="p-3">Net Profit</th>
              <th className="p-3">ROI</th>
              <th className="p-3">Mode</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
            {MOCK_PAPER_TRADES.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition">
                <td className="p-3 text-slate-400">{new Date(t.executedAt).toLocaleDateString()}</td>
                <td className="p-3 font-extrabold text-slate-900">{t.asset}</td>
                <td className="p-3 text-slate-600">{t.buyExchange} → {t.sellExchange}</td>
                <td className="p-3">{formatCurrency(t.capitalUSD, currency)}</td>
                <td className="p-3 font-extrabold text-emerald-600">+{formatCurrency(t.netProfitUSD, currency)}</td>
                <td className="p-3 font-bold text-emerald-700">+{t.roiPct}%</td>
                <td className="p-3 font-bold text-blue-700">{t.mode}</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
