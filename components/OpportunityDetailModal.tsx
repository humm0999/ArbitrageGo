'use client';

import React from 'react';
import { ArbitrageOpportunity, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/currency';
import {
  X,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  PlaySquare,
  Bell,
  ExternalLink,
  Layers,
  Clock,
  Zap,
} from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: ArbitrageOpportunity | null;
  onClose: () => void;
  currency: CurrencyCode;
  onPaperTrade: (opp: ArbitrageOpportunity) => void;
  onCreateAlert: (opp: ArbitrageOpportunity) => void;
}

export function OpportunityDetailModal({
  opportunity,
  onClose,
  currency,
  onPaperTrade,
  onCreateAlert,
}: OpportunityDetailModalProps) {
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-800 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 font-extrabold text-lg shadow-sm">
            {opportunity.asset}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900">{opportunity.pair} Arbitrage</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Score {opportunity.opportunityScore}/100
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Data age: {opportunity.dataAgeSeconds}s ● Live order book match
            </p>
          </div>
        </div>

        {/* Flow Diagram Card */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-center">
            {/* Buy Low Exchange */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                BUY LOW (ASK)
              </span>
              <span className="font-bold text-slate-900 text-sm block mt-0.5">
                {opportunity.buyExchange}
              </span>
              <span className="text-base font-extrabold text-slate-900 block mt-1">
                {formatCurrency(opportunity.buyPrice, currency)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Fee: {opportunity.buyFeePct}%
              </span>
            </div>

            {/* Arrow & Cost Middle */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="flex items-center gap-1 text-slate-400 my-1">
                <div className="h-0.5 w-8 bg-slate-300"></div>
                <ArrowRight className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="h-0.5 w-8 bg-slate-300"></div>
              </div>
              <span className="text-[11px] font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs">
                Costs: {formatCurrency(opportunity.networkCostUSD + opportunity.otherCostsUSD, currency)}
              </span>
            </div>

            {/* Sell High Exchange */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                SELL HIGH (BID)
              </span>
              <span className="font-bold text-slate-900 text-sm block mt-0.5">
                {opportunity.sellExchange}
              </span>
              <span className="text-base font-extrabold text-slate-900 block mt-1">
                {formatCurrency(opportunity.sellPrice, currency)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Fee: {opportunity.sellFeePct}%
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Gross Spread</span>
            <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
              +{opportunity.grossSpreadPct}%
            </span>
            <span className="text-[10px] text-slate-500">
              {formatCurrency(opportunity.grossSpread, currency)}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Est. Net Profit</span>
            <span className="text-sm font-extrabold text-emerald-600 block mt-0.5">
              {formatCurrency(opportunity.estimatedNetProfitUSD, currency)}
            </span>
            <span className="text-[10px] text-emerald-700 font-bold">
              +{opportunity.estimatedNetRoiPct}% ROI
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Liquidity Depth</span>
            <span className="text-sm font-bold text-slate-900 block mt-0.5">
              {formatCurrency(opportunity.liquidityUSD, currency)}
            </span>
            <span className="text-[10px] text-slate-400">Executable Volume</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Risk Rating</span>
            <span
              className={`text-sm font-bold block mt-0.5 ${
                opportunity.riskLevel === 'Low'
                  ? 'text-emerald-600'
                  : opportunity.riskLevel === 'Medium'
                  ? 'text-amber-600'
                  : 'text-red-600'
              }`}
            >
              {opportunity.riskLevel}
            </span>
            <span className="text-[10px] text-slate-400">Est. Slippage {opportunity.estimatedSlippagePct}%</span>
          </div>
        </div>

        {/* Cost Breakdown Detail List */}
        <div className="border border-slate-200 rounded-2xl p-4 mb-6 text-xs space-y-2.5">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
            Detailed Fee & Cost Analysis ($10,000 Nominal)
          </h4>
          <div className="flex justify-between text-slate-600">
            <span>Buy Exchange Fee ({opportunity.buyExchange} @ {opportunity.buyFeePct}%):</span>
            <span className="font-semibold text-slate-900">{formatCurrency(10000 * (opportunity.buyFeePct / 100), currency)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Sell Exchange Fee ({opportunity.sellExchange} @ {opportunity.sellFeePct}%):</span>
            <span className="font-semibold text-slate-900">{formatCurrency(10000 * (opportunity.sellFeePct / 100), currency)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Estimated Slippage ({opportunity.estimatedSlippagePct}%):</span>
            <span className="font-semibold text-slate-900">{formatCurrency(10000 * (opportunity.estimatedSlippagePct / 100), currency)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Network & Withdrawal Cost:</span>
            <span className="font-semibold text-slate-900">{formatCurrency(opportunity.networkCostUSD, currency)}</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900">
            <span>Estimated Net Revenue:</span>
            <span className="text-emerald-600 font-extrabold">{formatCurrency(opportunity.estimatedNetProfitUSD, currency)}</span>
          </div>
        </div>

        {/* Disclaimer Warning */}
        <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl mb-6 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            ArbitrageGo does not promise guaranteed profit. Opportunities are sensitive to execution speed, network congestion, order book slippage, and exchange outages.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              onPaperTrade(opportunity);
              onClose();
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
          >
            <PlaySquare className="w-4 h-4" />
            <span>Paper Trade</span>
          </button>

          <button
            onClick={() => {
              onCreateAlert(opportunity);
              onClose();
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 px-4 rounded-xl transition flex items-center gap-2"
          >
            <Bell className="w-4 h-4 text-slate-500" />
            <span>Set Alert</span>
          </button>
        </div>
      </div>
    </div>
  );
}
