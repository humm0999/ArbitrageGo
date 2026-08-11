export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateToUSD: number; // e.g. 1 USD = 83.2 INR
}

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface ExchangeInfo {
  id: string;
  name: string;
  logoUrl?: string;
  makerFee: number; // percentage e.g. 0.1%
  takerFee: number;
  withdrawalFees: Record<string, number>; // asset -> fixed fee
  status: 'Operational' | 'Degraded' | 'Offline';
  latencyMs: number;
  apiConnected?: boolean;
}

export interface ArbitrageOpportunity {
  id: string;
  asset: string; // e.g. BTC, ETH, SOL
  pair: string; // e.g. BTC/USDT
  buyExchange: string;
  sellExchange: string;
  buyPrice: number; // Executable Ask
  sellPrice: number; // Executable Bid
  grossSpread: number; // sellPrice - buyPrice
  grossSpreadPct: number; // (grossSpread / buyPrice) * 100
  buyFeePct: number;
  sellFeePct: number;
  estimatedSlippagePct: number;
  networkCostUSD: number;
  otherCostsUSD: number;
  estimatedNetProfitUSD: number;
  estimatedNetRoiPct: number;
  liquidityUSD: number;
  orderBookDepthBuy: number; // amount available
  orderBookDepthSell: number;
  dataAgeSeconds: number;
  riskLevel: RiskLevel;
  opportunityScore: number; // 0 - 100
  isLive: boolean;
  updatedAt: string;
}

export interface TriangularOpportunity {
  id: string;
  baseAsset: string; // USDT
  leg1Pair: string; // USDT -> BTC
  leg1Exchange: string;
  leg1Price: number;
  leg2Pair: string; // BTC -> ETH
  leg2Exchange: string;
  leg2Price: number;
  leg3Pair: string; // ETH -> USDT
  leg3Exchange: string;
  leg3Price: number;
  startingAmountUSD: number;
  finalAmountUSD: number;
  grossSpreadPct: number;
  totalFeesUSD: number;
  estimatedNetProfitUSD: number;
  netRoiPct: number;
  riskLevel: RiskLevel;
  updatedAt: string;
}

export interface DexOpportunity {
  id: string;
  token: string;
  network: 'Ethereum' | 'Solana' | 'BNB Chain' | 'Polygon' | 'Arbitrum' | 'Base';
  buyDex: string; // e.g. Uniswap v3
  sellDex: string; // e.g. Sushiswap / Curve / Raydium
  buyPrice: number;
  sellPrice: number;
  grossSpreadPct: number;
  gasCostUSD: number;
  priceImpactPct: number;
  liquidityUSD: number;
  estimatedNetProfitUSD: number;
  netRoiPct: number;
  riskLevel: RiskLevel;
  updatedAt: string;
}

export interface FundingOpportunity {
  id: string;
  asset: string;
  exchange: string;
  spotPrice: number;
  futuresPrice: number;
  fundingRate8hPct: number;
  annualizedYieldPct: number;
  basisUSD: number;
  estimatedNetProfitUSD: number;
  riskLevel: RiskLevel;
  updatedAt: string;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface OrderBook {
  exchange: string;
  pair: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  timestamp: string;
}

export interface PaperTrade {
  id: string;
  opportunityId?: string;
  asset: string;
  buyExchange: string;
  sellExchange: string;
  buyPrice: number;
  sellPrice: number;
  capitalUSD: number;
  feesPaidUSD: number;
  slippageIncurredUSD: number;
  netProfitUSD: number;
  roiPct: number;
  status: 'Completed' | 'Pending' | 'Failed' | 'Cancelled';
  executionTimeMs: number;
  mode: 'Paper' | 'Manual' | 'Automated';
  executedAt: string;
}

export interface AlertRule {
  id: string;
  asset: string;
  exchange?: string;
  minGrossSpreadPct: number;
  minNetRoiPct: number;
  minNetProfitUSD: number;
  minLiquidityUSD: number;
  maxSlippagePct: number;
  channel: 'In-App' | 'Email' | 'Browser' | 'Telegram';
  frequency: 'Immediate' | 'Once Hourly' | 'Daily Digest';
  isActive: boolean;
  createdAt: string;
}

export interface ApiCredential {
  id: string;
  exchangeId: string;
  exchangeName: string;
  apiKeyMasked: string;
  permissions: {
    read: boolean;
    trade: boolean;
    withdraw: boolean;
  };
  status: 'Connected' | 'Warning' | 'Error' | 'Testing';
  lastTestedAt: string;
  latencyMs: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  mobile: string;
  country: string;
  createdAt: string;
  verificationStatus: 'Verified' | 'Pending' | 'Unverified';
  plan: 'Free' | 'Pro' | 'Advanced' | 'Enterprise';
  mfaEnabled: boolean;
  paperBalanceUSD: number;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  isCurrent: boolean;
  lastActive: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'opportunity' | 'trade' | 'alert' | 'security' | 'system';
  timestamp: string;
  read: boolean;
}
