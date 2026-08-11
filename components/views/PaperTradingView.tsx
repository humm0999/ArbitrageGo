'use client';

import React, { useState } from 'react';
import { CurrencyCode, PaperTrade } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import { MOCK_PAPER_TRADES } from '@/lib/mock-data';
import { PlaySquare, RefreshCw, AlertTriangle, CheckCircle2, Clock, Zap } from 'lucide-react';

interface PaperTradingViewProps {
  currency: CurrencyCode;
}

export function PaperTradingView({ currency }: PaperTradingViewProps) {
  const [balanceUSD, setBalanceUSD] = useState(100000);
  const [trades, setTrades] = useState<PaperTrade[]>(MOCK_PAPER_TRADES);
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [tradeCapital, setTradeCapital] = useState(10000);
  const [simulatedDelayMs, setSimulatedDelayMs] = useState(450);
  const [isExecuting, setIsExecuting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const totalRealizedProfit = trades.reduce((acc, t) => acc + t.netProfitUSD, 0);

  const handleExecutePaperTrade = () => {
    if (tradeCapital > balanceUSD) {
      alert('Insufficient virtual balance!');
      return;
    }

    setIsExecuting(true);
    setSuccessMessage('');

    setTimeout(() => {
      const netProfitUSD = Math.round(tradeCapital * (0.008 + Math.random() * 0.012)); // ~0.8% - 2.0% profit
      const roiPct = Number(((netProfitUSD / tradeCapital) * 100).toFixed(2));

      const newTrade: PaperTrade = {
        id: `pt-${Date.now()}`,
        asset: selectedPair,
        buyExchange: 'Kraken Pro',
        sellExchange: 'Binance',
        buyPrice: 94100,
        sellPrice: 95200,
        capitalUSD: tradeCapital,
        feesPaidUSD: Math.round(tradeCapital * 0.002),
        slippageIncurredUSD: Math.round(tradeCapital * 0.0005),
        netProfitUSD,
        roiPct,
        status: 'Completed',
        executionTimeMs: simulatedDelayMs,
        mode: 'Paper',
        executedAt: new Date().toISOString(),
      };

      setTrades([newTrade, ...trades]);
      setBalanceUSD(balanceUSD + netProfitUSD);
      setIsExecuting(false);
      setSuccessMessage(`Paper Trade Executed! +${formatCurrency(netProfitUSD, currency)} (${roiPct}% ROI) added to virtual account.`);
    }, simulatedDelayMs);
  };

  const handleResetBalance = () => {
    if (confirm('Reset virtual paper trading account to initial $100,000 balance?')) {
      setBalanceUSD(100000);
      setTrades([]);
      setSuccessMessage('Paper account reset successfully.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Simulation Banner Header */}
      <div className="p-4 bg-amber-500 text-white rounded-2xl flex items-center justify-between font-bold text-xs shadow-md">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-100 shrink-0" />
          <span>SIMULATION MODE — NO REAL MONEY AT RISK</span>
        </div>
        <button
          onClick={handleResetBalance}
          className="bg-slate-900 hover:bg-black text-white font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Balance</span>
        </button>
      </div>

      {/* Main Stats Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Virtual Paper Trading Workstation</h1>
          <p className="text-xs text-slate-500 mt-1">
            Test arbitrage strategies, fee calculations, and execution latency with virtual capital.
          </p>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-right">
          <span className="text-[10px] font-bold text-emerald-800 uppercase block">Virtual Account Balance</span>
          <span className="text-2xl font-black text-emerald-700 block">
            {formatCurrency(balanceUSD, currency)}
          </span>
          <span className="text-[11px] font-bold text-emerald-800 block">
            Total P/L: +{formatCurrency(totalRealizedProfit, currency)}
          </span>
        </div>
      </div>

      {/* Order Controls & Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Order Entry Form */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
            Simulate Arbitrage Order
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Pair</label>
              <select
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
              >
                <option value="BTC/USDT">BTC/USDT (Kraken → Binance)</option>
                <option value="ETH/USDT">ETH/USDT (OKX → Coinbase)</option>
                <option value="SOL/USDT">SOL/USDT (Bybit → Gate.io)</option>
                <option value="XRP/USDT">XRP/USDT (KuCoin → Bitfinex)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Capital Amount ({currency})</label>
              <input
                type="number"
                value={tradeCapital}
                onChange={(e) => setTradeCapital(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Simulated Execution Delay: {simulatedDelayMs} ms
              </label>
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={simulatedDelayMs}
                onChange={(e) => setSimulatedDelayMs(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <button
              onClick={handleExecutePaperTrade}
              disabled={isExecuting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {isExecuting ? (
                <span>Simulating Order Execution...</span>
              ) : (
                <>
                  <PlaySquare className="w-4 h-4" />
                  <span>Execute Virtual Trade</span>
                </>
              )}
            </button>

            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Paper Trade History Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 mb-4">
            Paper Trade Execution Log
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-3">Asset</th>
                  <th className="p-3">Route</th>
                  <th className="p-3">Capital</th>
                  <th className="p-3">Net Profit</th>
                  <th className="p-3">ROI</th>
                  <th className="p-3">Delay</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {trades.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-extrabold text-slate-900">{t.asset}</td>
                    <td className="p-3 text-slate-600">{t.buyExchange} → {t.sellExchange}</td>
                    <td className="p-3">{formatCurrency(t.capitalUSD, currency)}</td>
                    <td className="p-3 font-extrabold text-emerald-600">
                      +{formatCurrency(t.netProfitUSD, currency)}
                    </td>
                    <td className="p-3 font-bold text-emerald-700">+{t.roiPct}%</td>
                    <td className="p-3 text-slate-400">{t.executionTimeMs}ms</td>
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
      </div>
    </div>
  );
}
