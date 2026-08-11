'use client';

import React from 'react';
import { CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_TRIANGULAR } from '@/lib/mock-data';
import { GitFork, ArrowRight, PlaySquare, ShieldCheck } from 'lucide-react';

interface TriangularViewProps {
  currency: CurrencyCode;
}

export function TriangularView({ currency }: TriangularViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Triangular Arbitrage Scanner</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Single-Exchange Loops
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Exploit price discrepancies across 3 currency pairs within the same exchange without cross-exchange withdrawal latency.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_TRIANGULAR.map((tri) => (
          <div key={tri.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                  3-LEG CONVERSION ROUTE
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  {tri.baseAsset} → {tri.leg1Pair.split(' -> ')[1]} → {tri.leg2Pair.split(' -> ')[1]} → {tri.baseAsset}
                </h3>
              </div>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                {tri.riskLevel} Risk
              </span>
            </div>

            {/* 3 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Leg 1 ({tri.leg1Exchange})</span>
                <span className="font-extrabold text-slate-900 text-sm block mt-1">{tri.leg1Pair}</span>
                <span className="text-xs text-slate-600 block mt-0.5">Rate: {tri.leg1Price}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Leg 2 ({tri.leg2Exchange})</span>
                <span className="font-extrabold text-slate-900 text-sm block mt-1">{tri.leg2Pair}</span>
                <span className="text-xs text-slate-600 block mt-0.5">Rate: {tri.leg2Price}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Leg 3 ({tri.leg3Exchange})</span>
                <span className="font-extrabold text-slate-900 text-sm block mt-1">{tri.leg3Pair}</span>
                <span className="text-xs text-slate-600 block mt-0.5">Rate: {tri.leg3Price}</span>
              </div>
            </div>

            {/* Result Bar */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Capital $10,000 Result</span>
                <span className="text-base font-black text-emerald-700">
                  Est Net: {formatCurrency(tri.estimatedNetProfitUSD, currency)} (+{tri.netRoiPct}% ROI)
                </span>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl transition">
                  Paper Trade Loop
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
