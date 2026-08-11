'use client';

import React, { useState } from 'react';
import { CurrencyCode, NotificationItem } from '@/lib/types';
import { CURRENCIES } from '@/lib/currency';
import { useAuth } from '@/lib/auth-context';
import {
  Search,
  Bell,
  ChevronDown,
  ShieldAlert,
  User,
  Shield,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  CheckCircle2,
  AlertTriangle,
  X,
  LogIn,
  UserPlus,
} from 'lucide-react';

interface AppHeaderProps {
  currentMarketFilter: string;
  setMarketFilter: (filter: string) => void;
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  isDemoMode: boolean;
  setIsDemoMode: (demo: boolean) => void;
  isAutoTradingActive: boolean;
  onEmergencyStop: () => void;
  onNavigate: (path: string) => void;
  notifications: NotificationItem[];
  onToggleSidebarMobile: () => void;
  onLogout: () => void;
}

export function AppHeader({
  currentMarketFilter,
  setMarketFilter,
  currency,
  setCurrency,
  isDemoMode,
  setIsDemoMode,
  isAutoTradingActive,
  onEmergencyStop,
  onNavigate,
  notifications,
  onToggleSidebarMobile,
  onLogout,
}: AppHeaderProps) {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/opportunities?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 shadow-xs sticky top-0 z-30">
      {/* Left: Mobile Toggle & Search & Market Index Ticker */}
      <div className="flex items-center space-x-4 sm:space-x-6 flex-1 max-w-2xl">
        <button
          onClick={onToggleSidebarMobile}
          className="lg:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-48 sm:w-64">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50 text-[#0A192F] font-medium"
          />
        </form>

        {/* Market Index Ticker */}
        <div className="hidden md:flex items-center space-x-3 text-xs font-semibold">
          <span className="text-gray-400 text-[11px] uppercase tracking-wider">Index:</span>
          <span className="text-emerald-600 font-mono font-bold">BTC +1.2%</span>
          <span className="text-red-500 font-mono font-bold">ETH -0.4%</span>
          <span className="text-emerald-600 font-mono font-bold hidden lg:inline">SOL +3.8%</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Market Category Selector */}
        <div className="hidden xl:flex items-center space-x-1 bg-gray-100 p-1 rounded-md text-[11px] font-bold">
          {['All', 'Spot', 'Triangular', 'DEX', 'Funding'].map((cat) => (
            <button
              key={cat}
              onClick={() => setMarketFilter(cat)}
              className={`px-2.5 py-1 rounded transition ${
                currentMarketFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#0A192F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Emergency Stop Button if Active */}
        {isAutoTradingActive && (
          <button
            onClick={onEmergencyStop}
            className="animate-pulse bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-2.5 py-1.5 rounded-md flex items-center space-x-1.5 uppercase tracking-wider"
            title="Emergency Stop All Auto Trading"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">STOP</span>
          </button>
        )}

        {/* Live Indicator */}
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider hidden sm:inline">
            LIVE ENGINE
          </span>
        </div>

        {/* Demo Mode Toggle */}
        <button
          onClick={() => setIsDemoMode(!isDemoMode)}
          className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition ${
            isDemoMode
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
        >
          {isDemoMode ? 'DEMO DATA' : 'PRO FEED'}
        </button>

        {/* Currency Selector */}
        <div className="relative">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="appearance-none bg-gray-50 border border-gray-200 text-[#0A192F] text-xs font-bold py-1 pl-2 pr-5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50 p-3 text-[#0A192F]">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                <h4 className="font-bold text-xs uppercase tracking-wider">Alerts & Logs</h4>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {unreadCount} New
                </span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2 bg-gray-50 rounded border border-gray-100 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-gray-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-gray-600">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Auth Control */}
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 rounded-md bg-[#0A192F] text-white font-extrabold text-xs flex items-center justify-center border border-gray-300 shadow-xs focus:outline-none relative"
            >
              <span>{user.avatarInitials}</span>
              {user.isVerified ? (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
              ) : (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"></span>
              )}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 py-1 text-xs text-[#0A192F]">
                <div className="px-3.5 py-2.5 border-b border-gray-100 mb-1 bg-gray-50/50">
                  <p className="font-extrabold">{user.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                  <div className="mt-1">
                    {user.isVerified ? (
                      <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        ✓ VERIFIED
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          openAuthModal('verify');
                        }}
                        className="text-[9px] font-extrabold bg-amber-100 text-amber-900 hover:bg-amber-200 px-1.5 py-0.5 rounded"
                      >
                        ⚠️ VERIFY EMAIL
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onNavigate('/portfolio');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-gray-50 flex items-center space-x-2 font-medium"
                >
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>Profile & Account</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('/security');
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-gray-50 flex items-center space-x-2 font-medium"
                >
                  <Shield className="w-3.5 h-3.5 text-gray-400" />
                  <span>Security & 2FA</span>
                </button>

                <div className="my-1 border-t border-gray-100"></div>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    onLogout();
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 font-bold flex items-center space-x-2"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => openAuthModal('login')}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#0A192F] text-xs font-bold rounded-lg transition flex items-center space-x-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition flex items-center space-x-1 shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
