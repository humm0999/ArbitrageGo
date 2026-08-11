'use client';

import React from 'react';
import { CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_OPPORTUNITIES } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import {
  ArrowRight,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  Calculator,
  Globe,
  BarChart3,
  Sparkles,
  ChevronRight,
  Bot,
  PlaySquare,
  AlertTriangle,
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (path: string) => void;
  currency: CurrencyCode;
  onEnterApp: () => void;
  isDemoMode: boolean;
}

export function LandingView({
  onNavigate,
  currency,
  onEnterApp,
  isDemoMode,
}: LandingViewProps) {
  const { openAuthModal, isAuthenticated } = useAuth();
  const topOpp = MOCK_OPPORTUNITIES[0];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Real-Time Market Comparison & Arbitrage Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Discover Arbitrage Opportunities Across Markets
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          ArbitrageGo compares market prices, costs, liquidity and execution conditions in real time to help you identify potential arbitrage opportunities.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              if (!isAuthenticated) {
                openAuthModal('register');
              } else {
                onEnterApp();
              }
            }}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>{isAuthenticated ? 'Open Dashboard' : 'Register Free Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!isAuthenticated && (
            <button
              onClick={() => openAuthModal('login')}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-7 py-3.5 rounded-2xl border border-slate-200 transition flex items-center justify-center gap-2"
            >
              <span>Sign In with Email</span>
            </button>
          )}
          <button
            onClick={() => onNavigate('/opportunities')}
            className="w-full sm:w-auto text-slate-600 hover:text-slate-900 font-semibold text-sm px-5 py-3.5 transition flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Explore Markets</span>
          </button>
        </div>

        {/* Animated Arbitrage Flow Graphic */}
        <div className="mt-14 max-w-4xl mx-auto bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-4 border-b border-slate-200/60 pb-3">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              ARBITRAGE EXECUTION FLOW ARCHITECTURE
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {isDemoMode ? 'DEMO DATA LIVE' : 'PRODUCTION FEED'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-left">
            {/* Exchange A */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                EXCHANGE A (LOW)
              </span>
              <span className="font-bold text-slate-900 text-sm block mt-1">{topOpp.buyExchange}</span>
              <span className="text-base font-black text-slate-900 block mt-0.5">
                {formatCurrency(topOpp.buyPrice, currency)}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">Executable Ask</span>
            </div>

            {/* Buy Arrow */}
            <div className="flex flex-col items-center justify-center py-2 text-center">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mb-1">
                BUY
              </span>
              <ArrowRight className="w-5 h-5 text-emerald-500 hidden md:block" />
            </div>

            {/* Engine Core */}
            <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-md text-center">
              <Zap className="w-5 h-5 mx-auto mb-1 text-blue-200" />
              <span className="font-extrabold text-xs block">ARBITRAGE ENGINE</span>
              <span className="text-[10px] text-blue-100 block mt-0.5">
                Deduct Fees, Slippage & Gas
              </span>
            </div>

            {/* Sell Arrow */}
            <div className="flex flex-col items-center justify-center py-2 text-center">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 mb-1">
                SELL
              </span>
              <ArrowRight className="w-5 h-5 text-blue-500 hidden md:block" />
            </div>

            {/* Exchange B */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                EXCHANGE B (HIGH)
              </span>
              <span className="font-bold text-slate-900 text-sm block mt-1">{topOpp.sellExchange}</span>
              <span className="text-base font-black text-slate-900 block mt-0.5">
                {formatCurrency(topOpp.sellPrice, currency)}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 mt-1 block">
                Net ROI: +{topOpp.estimatedNetRoiPct}%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 text-lg">Market Platform Statistics</h3>
          {isDemoMode && (
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Demo Statistics
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Markets Monitored', value: '450+', sub: 'Spot, DEX, Funding' },
            { label: 'Exchanges Connected', value: '18', sub: 'Binance, Kraken, OKX...' },
            { label: 'Live Opportunities', value: '34', sub: 'Updated every 0.4s' },
            { label: 'Best Spread', value: '4.63%', sub: 'ADA/USDT' },
            { label: 'Data Sources', value: 'REST + WS', sub: '<50ms Latency' },
            { label: 'Platform Traders', value: '12,400+', sub: 'Paper & Live' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-[11px] font-medium text-slate-500 block">{stat.label}</span>
              <span className="text-xl font-extrabold text-slate-900 block mt-1">{stat.value}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{stat.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How Arbitrage Works 4-Step Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How ArbitrageGo Works</h2>
          <p className="mt-2 text-slate-600 text-sm">
            Four disciplined steps to identify, calculate, evaluate, and execute price spreads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: 'Step 1',
              title: 'Compare',
              desc: 'Scan order books across 18+ major exchanges to detect bid/ask price disparities in real time.',
              icon: Globe,
            },
            {
              step: 'Step 2',
              title: 'Calculate',
              desc: 'Automatically subtract exchange maker/taker fees, order book slippage, and withdrawal gas costs.',
              icon: Calculator,
            },
            {
              step: 'Step 3',
              title: 'Evaluate',
              desc: 'Check liquidity depth, data freshness, latency risks, and calculate a realistic Net ROI score.',
              icon: BarChart3,
            },
            {
              step: 'Step 4',
              title: 'Act',
              desc: 'Simulate with risk-free paper trading or execute via user-authorized exchange API credentials.',
              icon: Bot,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs hover:shadow-md transition relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">{item.step}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Market Preview Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Current Arbitrage Scanner Feed</h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time order book price comparisons</p>
            </div>
            <button
              onClick={() => onNavigate('/opportunities')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All 34 Opportunities</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-3">Asset</th>
                  <th className="p-3">Buy Low</th>
                  <th className="p-3">Sell High</th>
                  <th className="p-3">Gross Spread</th>
                  <th className="p-3">Est. Net Profit</th>
                  <th className="p-3">Net ROI</th>
                  <th className="p-3">Risk</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {MOCK_OPPORTUNITIES.slice(0, 5).map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-extrabold text-slate-900">{opp.pair}</td>
                    <td className="p-3">
                      <span className="font-semibold block">{opp.buyExchange}</span>
                      <span className="text-[11px] text-slate-500">
                        {formatCurrency(opp.buyPrice, currency)}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold block">{opp.sellExchange}</span>
                      <span className="text-[11px] text-slate-500">
                        {formatCurrency(opp.sellPrice, currency)}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-900">+{opp.grossSpreadPct}%</td>
                    <td className="p-3 font-extrabold text-emerald-600">
                      {formatCurrency(opp.estimatedNetProfitUSD, currency)}
                    </td>
                    <td className="p-3 font-bold text-emerald-700">+{opp.estimatedNetRoiPct}%</td>
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
                    <td className="p-3 text-right">
                      <button
                        onClick={onEnterApp}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] px-3 py-1.5 rounded-xl transition"
                      >
                        Trade / View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Safety & Risk Disclaimer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-slate-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Risk & Transparency Assurance</span>
            </div>
            <h3 className="text-xl font-bold">ArbitrageGo Never Promises Guaranteed Profit</h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Every market opportunity is calculated against estimated fees, slippage, order depth, and latency. Always perform proper due diligence and start with Paper Trading before risking capital.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/risk-disclosure')}
            className="shrink-0 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-5 py-3 rounded-xl transition"
          >
            Read Risk Disclosure
          </button>
        </div>
      </section>
    </div>
  );
}
