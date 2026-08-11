'use client';

import React, { useState } from 'react';
import { CurrencyCode, AlertRule } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_ALERTS, MOCK_OPPORTUNITIES } from '@/lib/mock-data';
import { Bookmark, Bell, Plus, Trash2, CheckCircle2, PlaySquare } from 'lucide-react';

interface WatchlistAndAlertsViewProps {
  currency: CurrencyCode;
  mode: 'watchlist' | 'alerts';
}

export function WatchlistAndAlertsView({ currency, mode }: WatchlistAndAlertsViewProps) {
  const [alerts, setAlerts] = useState<AlertRule[]>(MOCK_ALERTS);
  const [newAsset, setNewAsset] = useState('BTC');
  const [newMinSpread, setNewMinSpread] = useState(1.0);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const newRule: AlertRule = {
      id: `alt-${Date.now()}`,
      asset: newAsset,
      exchange: 'All',
      minGrossSpreadPct: newMinSpread,
      minNetRoiPct: newMinSpread * 0.7,
      minNetProfitUSD: 50,
      minLiquidityUSD: 50000,
      maxSlippagePct: 0.1,
      channel: 'In-App',
      frequency: 'Immediate',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setAlerts([...alerts, newRule]);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  if (mode === 'watchlist') {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Saved Watchlist</h1>
            <p className="text-xs text-slate-500 mt-1">Track your favorite currency pairs and target price spreads.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_OPPORTUNITIES.slice(0, 4).map((opp) => (
            <div key={opp.id} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="font-extrabold text-slate-900 text-base">{opp.pair}</span>
                <span className="text-xs font-bold text-emerald-600">+{opp.grossSpreadPct}% Spread</span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Lowest Ask:</span>
                  <span className="font-bold text-slate-900">{opp.buyExchange}</span>
                </div>
                <div className="flex justify-between">
                  <span>Highest Bid:</span>
                  <span className="font-bold text-slate-900">{opp.sellExchange}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-100 font-bold text-emerald-700">
                  <span>Est. Net ROI:</span>
                  <span>+{opp.estimatedNetRoiPct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Real-Time Spread Alerts</h1>
          <p className="text-xs text-slate-500 mt-1">Get notified when net opportunity yields cross your target threshold.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Create Alert Form */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Create New Alert Rule</h3>
          <form onSubmit={handleCreateAlert} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Asset</label>
              <select
                value={newAsset}
                onChange={(e) => setNewAsset(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
              >
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
                <option value="SOL">SOL</option>
                <option value="XRP">XRP</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Min Gross Spread %</label>
              <input
                type="number"
                step="0.1"
                value={newMinSpread}
                onChange={(e) => setNewMinSpread(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Alert</span>
            </button>
          </form>
        </div>

        {/* Existing Alerts Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 mb-4">Active Alert Rules</h3>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="font-extrabold text-slate-900 text-sm">{a.asset} Spread Monitor</span>
                  <p className="text-slate-500 mt-0.5">
                    Trigger when Gross Spread ≥ {a.minGrossSpreadPct}% & Net ROI ≥ {a.minNetRoiPct}%
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteAlert(a.id)}
                  className="p-2 text-slate-400 hover:text-red-600 transition"
                  title="Delete Alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
