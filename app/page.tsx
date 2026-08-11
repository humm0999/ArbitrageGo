'use client';

import React, { useState } from 'react';
import { CurrencyCode, ArbitrageOpportunity, NotificationItem } from '@/lib/types';
import { AuthProvider } from '@/lib/auth-context';
import { Sidebar } from '@/components/Sidebar';
import { AppHeader } from '@/components/AppHeader';
import { CookieBanner } from '@/components/CookieBanner';
import { OpportunityDetailModal } from '@/components/OpportunityDetailModal';
import { AuthModal } from '@/components/AuthModal';

// Views
import { DashboardOverview } from '@/components/views/DashboardOverview';
import { LiveOpportunitiesView } from '@/components/views/LiveOpportunitiesView';
import { PriceComparisonView } from '@/components/views/PriceComparisonView';
import { TriangularView } from '@/components/views/TriangularView';
import { DexArbitrageView } from '@/components/views/DexArbitrageView';
import { FundingArbitrageView } from '@/components/views/FundingArbitrageView';
import { ProfitCalculatorView } from '@/components/views/ProfitCalculatorView';
import { PaperTradingView } from '@/components/views/PaperTradingView';
import { AutoTradingView } from '@/components/views/AutoTradingView';
import { WatchlistAndAlertsView } from '@/components/views/WatchlistAndAlertsView';
import { PortfolioAndHistoryView } from '@/components/views/PortfolioAndHistoryView';
import { AnalyticsView } from '@/components/views/AnalyticsView';
import { SecurityView } from '@/components/views/SecurityView';
import { LandingView } from '@/components/views/LandingView';

export default function MainPage() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [marketFilter, setMarketFilter] = useState('All');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isBeginnerMode, setIsBeginnerMode] = useState(false);
  const [isAutoTradingActive, setIsAutoTradingActive] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<ArbitrageOpportunity | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'SOL/USDT Spread Alert',
      message: 'OKX to Bybit net ROI reached +4.20% (Threshold >3.0%)',
      type: 'alert',
      timestamp: '2m ago',
      read: false,
    },
    {
      id: 'n2',
      title: 'Triangular Arbitrage Loop',
      message: 'Detected 0.95% profit route on Binance (USDT -> ETH -> BTC -> USDT)',
      type: 'opportunity',
      timestamp: '15m ago',
      read: false,
    },
    {
      id: 'n3',
      title: 'Paper Trade Filled',
      message: 'Virtual order executed on BTC/USDT with +$45.20 realized gain',
      type: 'trade',
      timestamp: '1h ago',
      read: true,
    },
  ]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmergencyStop = () => {
    setIsAutoTradingActive(false);
    alert('EMERGENCY STOP ACTIVATED: All automated execution routines have been halted immediately.');
  };

  const handlePaperTrade = (opp: ArbitrageOpportunity) => {
    setCurrentPath('/paper-trading');
  };

  const handleCreateAlert = (opp: ArbitrageOpportunity) => {
    setCurrentPath('/alerts');
  };

  // View Router
  const renderCurrentView = () => {
    switch (currentPath) {
      case '/landing':
        return (
          <LandingView
            onNavigate={handleNavigate}
            currency={currency}
            onEnterApp={() => setCurrentPath('/dashboard')}
            isDemoMode={isDemoMode}
          />
        );
      case '/dashboard':
        return (
          <DashboardOverview
            onNavigate={handleNavigate}
            currency={currency}
            isBeginnerMode={isBeginnerMode}
            setIsBeginnerMode={setIsBeginnerMode}
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
            onPaperTrade={handlePaperTrade}
          />
        );
      case '/opportunities':
        return (
          <LiveOpportunitiesView
            currency={currency}
            isBeginnerMode={isBeginnerMode}
            setIsBeginnerMode={setIsBeginnerMode}
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
            onPaperTrade={handlePaperTrade}
            onCreateAlert={handleCreateAlert}
          />
        );
      case '/markets':
      case '/exchanges':
        return <PriceComparisonView currency={currency} />;
      case '/triangular':
        return <TriangularView currency={currency} />;
      case '/dex':
        return <DexArbitrageView currency={currency} />;
      case '/funding':
        return <FundingArbitrageView currency={currency} />;
      case '/calculator':
        return <ProfitCalculatorView currency={currency} setCurrency={setCurrency} />;
      case '/paper-trading':
        return <PaperTradingView currency={currency} />;
      case '/auto-trading':
        return (
          <AutoTradingView
            currency={currency}
            isAutoTradingActive={isAutoTradingActive}
            setIsAutoTradingActive={setIsAutoTradingActive}
            onEmergencyStop={handleEmergencyStop}
          />
        );
      case '/watchlist':
        return <WatchlistAndAlertsView currency={currency} mode="watchlist" />;
      case '/alerts':
        return <WatchlistAndAlertsView currency={currency} mode="alerts" />;
      case '/portfolio':
        return <PortfolioAndHistoryView currency={currency} mode="portfolio" />;
      case '/history':
        return <PortfolioAndHistoryView currency={currency} mode="history" />;
      case '/analytics':
        return <AnalyticsView currency={currency} />;
      case '/security':
      case '/api-connections':
        return <SecurityView />;
      default:
        return (
          <DashboardOverview
            onNavigate={handleNavigate}
            currency={currency}
            isBeginnerMode={isBeginnerMode}
            setIsBeginnerMode={setIsBeginnerMode}
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
            onPaperTrade={handlePaperTrade}
          />
        );
    }
  };

  return (
    <AuthProvider>
      <div className="flex h-screen w-full bg-[#F3F4F6] text-[#0A192F] font-sans overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          currentPath={currentPath}
          onNavigate={handleNavigate}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onLogout={() => setCurrentPath('/landing')}
        />

        {/* Main Execution View */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          <AppHeader
            currentMarketFilter={marketFilter}
            setMarketFilter={setMarketFilter}
            currency={currency}
            setCurrency={setCurrency}
            isDemoMode={isDemoMode}
            setIsDemoMode={setIsDemoMode}
            isAutoTradingActive={isAutoTradingActive}
            onEmergencyStop={handleEmergencyStop}
            onNavigate={handleNavigate}
            notifications={notifications}
            onToggleSidebarMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            onLogout={() => setCurrentPath('/landing')}
          />

          {/* Content Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {renderCurrentView()}
          </main>

          {/* Footer */}
          <footer className="h-8 bg-white border-t border-gray-200 px-6 flex items-center justify-between text-[10px] text-gray-500 shrink-0">
            <div className="truncate">
              Connected: Binance, Kraken, Coinbase, OKX, Bybit, KuCoin, Gate.io
            </div>
            <div className="flex space-x-4 shrink-0 font-medium">
              <span>
                Engine: <span className="text-emerald-600 font-bold">HEALTHY</span>
              </span>
              <span>v2.4.1-HighDensity</span>
            </div>
          </footer>
        </div>

        {/* Opportunity Detail Modal */}
        <OpportunityDetailModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          currency={currency}
          onPaperTrade={handlePaperTrade}
          onCreateAlert={handleCreateAlert}
        />

        {/* Authentication Modal */}
        <AuthModal />

        {/* Cookie Banner */}
        <CookieBanner />
      </div>
    </AuthProvider>
  );
}
