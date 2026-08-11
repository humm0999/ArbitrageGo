'use client';

import React from 'react';
import { ArbitrageOpportunity, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_OPPORTUNITIES } from '@/lib/mock-data';
import { AdBanner } from '@/components/AdBanner';
import {
  Zap,
  PlaySquare,
  Bell,
  ArrowRight,
  Bot,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate: (path: string) => void;
  currency: CurrencyCode;
  isBeginnerMode: boolean;
  setIsBeginnerMode: (val: boolean) => void;
  onSelectOpportunity: (opp: ArbitrageOpportunity) => void;
  onPaperTrade: (opp: ArbitrageOpportunity) => void;
}

export function DashboardOverview({
  onNavigate,
  currency,
  isBeginnerMode,
  setIsBeginnerMode,
  onSelectOpportunity,
  onPaperTrade,
}: DashboardOverviewProps) {
  const bestOpp = MOCK_OPPORTUNITIES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-[#0A192F]">
      {/* Left Column - Stats & Main Table (8 cols on lg) */}
      <div className="lg:col-span-8 flex flex-col space-y-6">
        {/* Top 3 High Density Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
              Live Opportunities
            </div>
            <div className="text-2xl font-black text-[#0A192F]">{MOCK_OPPORTUNITIES.length + 116}</div>
            <div className="text-xs text-emerald-600 font-bold mt-0.5">+12 in last 5m</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
              Best Net ROI
            </div>
            <div className="text-2xl font-black text-emerald-600">
              +{bestOpp.estimatedNetRoiPct}%
            </div>
            <div className="text-xs text-gray-400 font-bold mt-0.5">{bestOpp.pair}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
              Paper Balance
            </div>
            <div className="text-2xl font-black text-[#0A192F]">
              {formatCurrency(102450.0, currency)}
            </div>
            <div className="text-xs text-emerald-600 font-bold mt-0.5">+$2,450 Profit</div>
          </div>
        </div>

        {/* Current Arbitrage Opportunities Matrix */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs flex flex-col flex-1 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-2">
            <h2 className="font-extrabold text-[#0A192F] uppercase text-xs tracking-widest">
              Current Arbitrage Opportunities
            </h2>
            <div className="flex space-x-2 text-[10px]">
              <button
                onClick={() => onNavigate('/opportunities')}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-[#0A192F] font-bold uppercase tracking-wider"
              >
                Refresh (5s)
              </button>
              <button
                onClick={() => setIsBeginnerMode(!isBeginnerMode)}
                className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded font-bold uppercase tracking-wider"
              >
                {isBeginnerMode ? 'Table View' : 'Card View'}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-3">Asset</th>
                  <th className="px-4 py-3">Exch: Buy</th>
                  <th className="px-4 py-3">Buy Price</th>
                  <th className="px-4 py-3">Exch: Sell</th>
                  <th className="px-4 py-3">Sell Price</th>
                  <th className="px-4 py-3">Net ROI</th>
                  <th className="px-6 py-3">Risk</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-gray-50 font-medium">
                {MOCK_OPPORTUNITIES.map((opp) => (
                  <tr
                    key={opp.id}
                    className="hover:bg-blue-50/30 transition cursor-pointer"
                    onClick={() => onSelectOpportunity(opp)}
                  >
                    <td className="px-6 py-3.5 font-bold text-[#0A192F]">{opp.pair}</td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-gray-700">{opp.buyExchange}</td>
                    <td className="px-4 py-3.5 font-mono text-gray-900">{formatCurrency(opp.buyPrice, currency)}</td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-gray-700">{opp.sellExchange}</td>
                    <td className="px-4 py-3.5 font-mono text-gray-900">{formatCurrency(opp.sellPrice, currency)}</td>
                    <td className="px-4 py-3.5 text-emerald-600 font-extrabold">+{opp.estimatedNetRoiPct}%</td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          opp.riskLevel === 'Low'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {opp.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onPaperTrade(opp)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold uppercase tracking-wider"
                      >
                        Simulate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Google AdSense Placement */}
        <AdBanner slotId="9876543210" label="Monetized Ad Unit" />
      </div>

      {/* Right Column - Featured Opportunity & Activity Feed (4 cols on lg) */}
      <div className="lg:col-span-4 flex flex-col space-y-6">
        {/* Featured Opportunity Navy Dark Card */}
        <div className="bg-[#0A192F] text-white p-6 rounded-xl shadow-lg border border-blue-900">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
            Featured Opportunity
          </h3>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-black">{bestOpp.pair}</span>
              <span className="px-2 py-1 bg-blue-600 text-[10px] rounded uppercase font-bold tracking-wider">
                Spot Arbi
              </span>
            </div>

            <div className="flex items-center space-x-4 border-l-2 border-dashed border-blue-600 pl-4 py-1">
              <div className="flex-1">
                <div className="text-[10px] uppercase text-blue-300 font-bold">Buy Low (Exchange A)</div>
                <div className="text-sm font-bold mt-0.5">
                  {bestOpp.buyExchange}: {formatCurrency(bestOpp.buyPrice, currency)}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 border-l-2 border-dashed border-blue-600 pl-4 py-1">
              <div className="flex-1">
                <div className="text-[10px] uppercase text-blue-300 font-bold">Sell High (Exchange B)</div>
                <div className="text-sm font-bold mt-0.5">
                  {bestOpp.sellExchange}: {formatCurrency(bestOpp.sellPrice, currency)}
                </div>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-800/50">
              <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                <span className="text-gray-400">Gross Spread:</span>
                <span className="text-right text-white font-bold">+{bestOpp.grossSpreadPct}%</span>
                <span className="text-gray-400">Est. Fees:</span>
                <span className="text-right text-red-400 font-bold">0.22%</span>
                <span className="text-gray-400">Slippage (0.1%):</span>
                <span className="text-right text-red-400 font-bold">
                  {formatCurrency(bestOpp.buyPrice * 0.001, currency)}
                </span>
                <div className="col-span-2 border-t border-blue-800 my-1"></div>
                <span className="text-xs font-bold text-gray-200">Net Profit:</span>
                <span className="text-right text-xs font-black text-emerald-400">
                  {formatCurrency(bestOpp.estimatedNetProfitUSD, currency)}
                </span>
              </div>
            </div>

            <button
              onClick={() => onPaperTrade(bestOpp)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              Paper Trade Now
            </button>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
            Recent Engine Activity
          </h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-[#0A192F]">Paper Trade Executed</div>
                <div className="text-[10px] text-gray-500">
                  BTC/USDT Binance to Kraken • +$45.20
                </div>
              </div>
              <div className="text-[10px] text-gray-400 font-semibold">2m</div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold">
                !
              </div>
              <div className="flex-1">
                <div className="font-bold text-[#0A192F]">Alert Triggered</div>
                <div className="text-[10px] text-gray-500">SOL price spread &gt; 3% detected</div>
              </div>
              <div className="text-[10px] text-gray-400 font-semibold">15m</div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-[#0A192F]">Triangular Loop Scanned</div>
                <div className="text-[10px] text-gray-500">USDT → ETH → BTC → USDT on OKX</div>
              </div>
              <div className="text-[10px] text-gray-400 font-semibold">42m</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
