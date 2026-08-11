'use client';

import React from 'react';
import { Logo } from './Logo';
import {
  LayoutDashboard,
  Zap,
  TrendingUp,
  Landmark,
  GitFork,
  Flame,
  Scale,
  Calculator,
  PlaySquare,
  Bot,
  Bookmark,
  Bell,
  PieChart,
  History,
  BarChart3,
  KeyRound,
  Shield,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  X,
  ShieldAlert,
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
}

export function Sidebar({
  currentPath,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
  onLogout,
}: SidebarProps) {
  const navGroups = [
    {
      groupTitle: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Live Opportunities', path: '/opportunities', icon: Zap, badge: 'HOT' },
        { label: 'Price Comparison', path: '/markets', icon: Scale },
        { label: 'Exchanges', path: '/exchanges', icon: Landmark },
      ],
    },
    {
      groupTitle: 'STRATEGIES',
      items: [
        { label: 'Triangular Arbitrage', path: '/triangular', icon: GitFork },
        { label: 'DEX Arbitrage', path: '/dex', icon: Flame },
        { label: 'Funding Yield', path: '/funding', icon: TrendingUp },
      ],
    },
    {
      groupTitle: 'EXECUTION & TOOLS',
      items: [
        { label: 'Profit Calculator', path: '/calculator', icon: Calculator },
        { label: 'Paper Trading', path: '/paper-trading', icon: PlaySquare, badge: 'SIM' },
        { label: 'Automated Trading', path: '/auto-trading', icon: Bot },
      ],
    },
    {
      groupTitle: 'MANAGEMENT',
      items: [
        { label: 'Watchlist', path: '/watchlist', icon: Bookmark },
        { label: 'Alerts', path: '/alerts', icon: Bell },
        { label: 'Portfolio', path: '/portfolio', icon: PieChart },
        { label: 'Trade History', path: '/history', icon: History },
        { label: 'Analytics', path: '/analytics', icon: BarChart3 },
      ],
    },
    {
      groupTitle: 'INTEGRATION & ADMIN',
      items: [
        { label: 'API Connections', path: '/api-connections', icon: KeyRound },
        { label: 'Security & 2FA', path: '/security', icon: Shield },
        { label: 'Subscription', path: '/subscription', icon: CreditCard },
        { label: 'Admin Panel', path: '/admin', icon: ShieldAlert },
        { label: 'Help & Support', path: '/help', icon: HelpCircle },
      ],
    },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#0A192F] text-white select-none">
      {/* Sidebar Header Logo */}
      <div className="p-5 border-b border-gray-800 flex items-center justify-between">
        <button onClick={() => onNavigate('/dashboard')} className="focus:outline-none text-left">
          <Logo isDarkBackground={true} />
        </button>
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-lg"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((group) => (
          <div key={group.groupTitle} className="space-y-1">
            <h5 className="px-3 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              {group.groupTitle}
            </h5>
            <div className="mt-1 space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      onNavigate(item.path);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          isActive
                            ? 'bg-blue-700 text-white'
                            : 'bg-gray-800 text-blue-400 border border-blue-900/50'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status & Logout */}
      <div className="p-4 border-t border-gray-800 space-y-3 bg-[#081325]">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Engine Connected</span>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-60 shrink-0 h-screen sticky top-0 z-40 border-r border-gray-800">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-64 max-w-[80vw] bg-[#0A192F] h-full z-10 shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
