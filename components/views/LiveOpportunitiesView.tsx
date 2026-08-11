'use client';

import React, { useState } from 'react';
import { ArbitrageOpportunity, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_OPPORTUNITIES } from '@/lib/mock-data';
import {
  Search,
  Filter,
  Zap,
  Eye,
  PlaySquare,
  Bell,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

interface LiveOpportunitiesViewProps {
  currency: CurrencyCode;
  isBeginnerMode: boolean;
  setIsBeginnerMode: (val: boolean) => void;
  onSelectOpportunity: (opp: ArbitrageOpportunity) => void;
  onPaperTrade: (opp: ArbitrageOpportunity) => void;
  onCreateAlert: (opp: ArbitrageOpportunity) => void;
}

export function LiveOpportunitiesView({
  currency,
  isBeginnerMode,
  setIsBeginnerMode,
  onSelectOpportunity,
  onPaperTrade,
  onCreateAlert,
}: LiveOpportunitiesViewProps) {
  const [search, setSearch] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('ALL');
  const [minSpread, setMinSpread] = useState(0);
  const [riskFilter, setRiskFilter] = useState('ALL');

  const filtered = MOCK_OPPORTUNITIES.filter((opp) => {
    const matchesSearch =
      opp.pair.toLowerCase().includes(search.toLowerCase()) ||
      opp.buyExchange.toLowerCase().includes(search.toLowerCase()) ||
      opp.sellExchange.toLowerCase().includes(search.toLowerCase());
    const matchesAsset = selectedAsset === 'ALL' || opp.asset === selectedAsset;
    const matchesSpread = opp.grossSpreadPct >= minSpread;
    const matchesRisk = riskFilter === 'ALL' || opp.riskLevel === riskFilter;

    return matchesSearch && matchesAsset && matchesSpread && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Live Opportunity Scanner</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              LIVE ● {filtered.length} Opportunities
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time cross-exchange price spreads updated every 0.4 seconds.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setIsBeginnerMode(true)}
            className={`px-3 py-1.5 rounded-xl transition ${
              isBeginnerMode ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
            }`}
          >
            Beginner View
          </button>
          <button
            onClick={() => setIsBeginnerMode(false)}
            className={`px-3 py-1.5 rounded-xl transition ${
              !isBeginnerMode ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
            }`}
          >
            Advanced Table
          </button>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search pair, exchange..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Asset Selector */}
        <div>
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="ALL">All Crypto Assets (BTC, ETH, SOL...)</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="SOL">Solana (SOL)</option>
            <option value="XRP">Ripple (XRP)</option>
            <option value="DOGE">Dogecoin (DOGE)</option>
            <option value="ADA">Cardano (ADA)</option>
          </select>
        </div>

        {/* Minimum Spread Slider */}
        <div className="flex flex-col justify-center px-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
            <span>Min Spread %</span>
            <span className="text-blue-600 font-bold">{minSpread}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minSpread}
            onChange={(e) => setMinSpread(parseFloat(e.target.value))}
            className="accent-blue-600 w-full cursor-pointer"
          />
        </div>

        {/* Risk Filter */}
        <div>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="Low">Low Risk Only</option>
            <option value="Medium">Medium Risk Only</option>
            <option value="High">High Risk Only</option>
          </select>
        </div>
      </div>

      {/* Main Content View */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="font-bold text-slate-800 text-sm">No opportunities match current filter criteria.</p>
            <p className="text-xs mt-1">Try lowering the minimum spread or selecting &apos;All Risk Levels&apos;.</p>
          </div>
        ) : isBeginnerMode ? (
          /* Beginner Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((opp) => (
              <div
                key={opp.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-lg">{opp.pair}</span>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                      Score {opp.opportunityScore}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      opp.riskLevel === 'Low'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {opp.riskLevel} Risk
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block">BUY LOW</span>
                      <span className="font-bold text-slate-900 block">{opp.buyExchange}</span>
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm">{formatCurrency(opp.buyPrice, currency)}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase block">SELL HIGH</span>
                      <span className="font-bold text-slate-900 block">{opp.sellExchange}</span>
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm">{formatCurrency(opp.sellPrice, currency)}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">Estimated Net Result</span>
                    <span className="text-emerald-700 font-extrabold text-sm">
                      {formatCurrency(opp.estimatedNetProfitUSD, currency)}
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-200">
                    +{opp.estimatedNetRoiPct}% ROI
                  </span>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => onSelectOpportunity(opp)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition"
                  >
                    VIEW
                  </button>
                  <button
                    onClick={() => onPaperTrade(opp)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3.5 rounded-xl transition"
                  >
                    PAPER TRADE
                  </button>
                  <button
                    onClick={() => onCreateAlert(opp)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-xl transition"
                    title="Alert"
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Advanced Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-3">Asset</th>
                  <th className="p-3">Buy Exchange</th>
                  <th className="p-3">Buy Price</th>
                  <th className="p-3">Sell Exchange</th>
                  <th className="p-3">Sell Price</th>
                  <th className="p-3">Gross Spread</th>
                  <th className="p-3">Buy Fee</th>
                  <th className="p-3">Sell Fee</th>
                  <th className="p-3">Slippage</th>
                  <th className="p-3">Net Profit</th>
                  <th className="p-3">Net ROI</th>
                  <th className="p-3">Liquidity</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Risk</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {filtered.map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-extrabold text-slate-900">{opp.pair}</td>
                    <td className="p-3 font-semibold">{opp.buyExchange}</td>
                    <td className="p-3 text-emerald-700 font-bold">{formatCurrency(opp.buyPrice, currency)}</td>
                    <td className="p-3 font-semibold">{opp.sellExchange}</td>
                    <td className="p-3 text-blue-700 font-bold">{formatCurrency(opp.sellPrice, currency)}</td>
                    <td className="p-3 font-bold text-slate-900">+{opp.grossSpreadPct}%</td>
                    <td className="p-3 text-slate-500">{opp.buyFeePct}%</td>
                    <td className="p-3 text-slate-500">{opp.sellFeePct}%</td>
                    <td className="p-3 text-slate-500">{opp.estimatedSlippagePct}%</td>
                    <td className="p-3 font-extrabold text-emerald-600">
                      {formatCurrency(opp.estimatedNetProfitUSD, currency)}
                    </td>
                    <td className="p-3 font-extrabold text-emerald-700">+{opp.estimatedNetRoiPct}%</td>
                    <td className="p-3 text-slate-600">{formatCurrency(opp.liquidityUSD, currency)}</td>
                    <td className="p-3 text-slate-400">{opp.dataAgeSeconds}s</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          opp.riskLevel === 'Low'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {opp.riskLevel}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => onSelectOpportunity(opp)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] px-2.5 py-1 rounded-lg transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onPaperTrade(opp)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[10px] px-2.5 py-1 rounded-lg transition"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
