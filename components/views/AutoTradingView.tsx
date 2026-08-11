'use client';

import React, { useState } from 'react';
import { CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { Bot, ShieldAlert, CheckCircle2, AlertTriangle, Power } from 'lucide-react';

interface AutoTradingViewProps {
  currency: CurrencyCode;
  isAutoTradingActive: boolean;
  setIsAutoTradingActive: (val: boolean) => void;
  onEmergencyStop: () => void;
}

export function AutoTradingView({
  currency,
  isAutoTradingActive,
  setIsAutoTradingActive,
  onEmergencyStop,
}: AutoTradingViewProps) {
  const [maxTradeAmount, setMaxTradeAmount] = useState(5000);
  const [maxDailyLoss, setMaxDailyLoss] = useState(500);
  const [minNetRoiPct, setMinNetRoiPct] = useState(0.8);
  const [maxSlippagePct, setMaxSlippagePct] = useState(0.1);
  const [maxExecutionTimeMs, setMaxExecutionTimeMs] = useState(800);

  const handleToggleActive = () => {
    if (!isAutoTradingActive) {
      if (
        confirm(
          'WARNING: Enable Automated Arbitrage Execution? Ensure your risk controls, max trade limits, and emergency stop parameters are correctly configured.'
        )
      ) {
        setIsAutoTradingActive(true);
      }
    } else {
      setIsAutoTradingActive(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Stop Big Header */}
      <div className="bg-red-600 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-wider">EMERGENCY STOP CONTROL</h2>
            <p className="text-xs text-red-100 mt-0.5">
              Instantly halts all automated order generation and revokes pending bot execution routines.
            </p>
          </div>
        </div>

        <button
          onClick={onEmergencyStop}
          className="w-full md:w-auto bg-white hover:bg-slate-100 text-red-600 font-black text-sm px-8 py-4 rounded-2xl shadow-lg transition active:scale-95 uppercase tracking-wider"
        >
          HALT ALL AUTO TRADING NOW
        </button>
      </div>

      {/* Mode Status Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Automated Strategy Engine</h1>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                isAutoTradingActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {isAutoTradingActive ? 'ACTIVE & MONITORING' : 'OFF / PAUSED'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Programmatically scans for valid net spread opportunities that satisfy your exact risk profile.
          </p>
        </div>

        {/* Master Power Toggle */}
        <button
          onClick={handleToggleActive}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-xs transition shadow-md ${
            isAutoTradingActive
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
              : 'bg-slate-800 hover:bg-slate-900 text-white shadow-slate-800/20'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{isAutoTradingActive ? 'AUTO TRADING ENABLED' : 'ENABLE AUTO TRADING'}</span>
        </button>
      </div>

      {/* Safety Risk Control Parameters Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
          Automated Risk & Limit Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Max Order Size ({currency})</label>
            <input
              type="number"
              value={maxTradeAmount}
              onChange={(e) => setMaxTradeAmount(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Max Daily Loss Cutoff ({currency})</label>
            <input
              type="number"
              value={maxDailyLoss}
              onChange={(e) => setMaxDailyLoss(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Min Net ROI % Threshold</label>
            <input
              type="number"
              step="0.1"
              value={minNetRoiPct}
              onChange={(e) => setMinNetRoiPct(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Max Slippage Tolerance %</label>
            <input
              type="number"
              step="0.05"
              value={maxSlippagePct}
              onChange={(e) => setMaxSlippagePct(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Max Order Latency Cutoff (ms)</label>
            <input
              type="number"
              value={maxExecutionTimeMs}
              onChange={(e) => setMaxExecutionTimeMs(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Allowed Asset Pairs</label>
            <input
              type="text"
              defaultValue="BTC/USDT, ETH/USDT, SOL/USDT"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
