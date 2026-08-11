'use client';

import React, { useState } from 'react';
import { CurrencyCode } from '@/lib/types';
import { formatCurrency, CURRENCIES } from '@/lib/currency';
import { Calculator, ArrowRight, DollarSign, Layers } from 'lucide-react';

interface ProfitCalculatorViewProps {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}

export function ProfitCalculatorView({ currency, setCurrency }: ProfitCalculatorViewProps) {
  const [capital, setCapital] = useState(10000);
  const [buyPrice, setBuyPrice] = useState(94000);
  const [sellPrice, setSellPrice] = useState(95200);
  const [buyFeePct, setBuyFeePct] = useState(0.1);
  const [sellFeePct, setSellFeePct] = useState(0.1);
  const [slippagePct, setSlippagePct] = useState(0.05);
  const [networkFeeUSD, setNetworkFeeUSD] = useState(12.5);
  const [otherCostsUSD, setOtherCostsUSD] = useState(5.0);

  // Math Calculations
  const unitsPurchased = capital / buyPrice;
  const grossRevenue = unitsPurchased * sellPrice;
  const grossProfit = grossRevenue - capital;
  const grossSpreadPct = ((sellPrice - buyPrice) / buyPrice) * 100;

  const buyFeeCost = capital * (buyFeePct / 100);
  const sellFeeCost = grossRevenue * (sellFeePct / 100);
  const slippageCost = capital * (slippagePct / 100);
  const totalCosts = buyFeeCost + sellFeeCost + slippageCost + networkFeeUSD + otherCostsUSD;

  const netProfit = grossProfit - totalCosts;
  const netRoiPct = (netProfit / capital) * 100;

  // Break-even sell price calculation
  // Capital + Total Costs = unitsPurchased * breakEvenSellPrice
  // breakEvenSellPrice = (Capital + Total Costs) / unitsPurchased
  const breakEvenSellPrice = (capital + totalCosts) / unitsPurchased;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900">Arbitrage Profit & Break-Even Calculator</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Multi-Currency Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Calculate exact net profitability after deducting maker/taker fees, order book slippage, and withdrawal network costs.
          </p>
        </div>

        {/* Currency Picker */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <span>Currency:</span>
          {Object.keys(CURRENCIES).map((code) => (
            <button
              key={code}
              onClick={() => setCurrency(code as CurrencyCode)}
              className={`px-2.5 py-1 rounded-xl transition ${
                currency === code
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
            Trade Parameters & Costs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Trading Capital ({currency})</label>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Buy Price (Ask)</label>
              <input
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Sell Price (Bid)</label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Buy Exchange Fee %</label>
              <input
                type="number"
                step="0.05"
                value={buyFeePct}
                onChange={(e) => setBuyFeePct(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Sell Exchange Fee %</label>
              <input
                type="number"
                step="0.05"
                value={sellFeePct}
                onChange={(e) => setSellFeePct(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Estimated Slippage %</label>
              <input
                type="number"
                step="0.01"
                value={slippagePct}
                onChange={(e) => setSlippagePct(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Network/Gas Cost ($ USD)</label>
              <input
                type="number"
                value={networkFeeUSD}
                onChange={(e) => setNetworkFeeUSD(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Other Execution Costs ($ USD)</label>
              <input
                type="number"
                value={otherCostsUSD}
                onChange={(e) => setOtherCostsUSD(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Output Results Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
              Calculation Summary
            </h3>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">Gross Spread %:</span>
                <span className="font-extrabold text-slate-900">+{grossSpreadPct.toFixed(2)}%</span>
              </div>

              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">Gross Profit:</span>
                <span className="font-extrabold text-slate-900">{formatCurrency(grossProfit, currency)}</span>
              </div>

              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">Total Deducted Costs:</span>
                <span className="font-extrabold text-red-600">-{formatCurrency(totalCosts, currency)}</span>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Estimated Net Profit</span>
                <span className="text-2xl font-black text-emerald-700 block mt-1">
                  {formatCurrency(netProfit, currency)}
                </span>
                <span className="text-xs font-bold text-emerald-800 block mt-0.5">
                  Net ROI: {netRoiPct.toFixed(2)}%
                </span>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                <span className="text-[10px] font-bold text-blue-800 uppercase block">Break-Even Sell Price</span>
                <span className="text-lg font-black text-blue-900 block mt-0.5">
                  {formatCurrency(breakEvenSellPrice, currency)}
                </span>
                <span className="text-[11px] text-blue-700 block">
                  Must sell at or above this price to avoid net loss.
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic mt-4">
            * All calculations assume immediate liquidity matching. Actual execution prices depend on live order book volume.
          </p>
        </div>
      </div>
    </div>
  );
}
