'use client';

import React from 'react';
import { Logo } from './Logo';
import { CurrencyCode } from '@/lib/types';
import { CURRENCIES } from '@/lib/currency';
import { ArrowRight, ChevronDown, Activity, Sparkles, LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  onEnterApp: () => void;
}

export function Navbar({
  currentPath,
  onNavigate,
  currency,
  setCurrency,
  isDemoMode,
  setIsDemoMode,
  onEnterApp,
}: NavbarProps) {
  const navLinks = [
    { label: 'Live Markets', path: '/opportunities' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Features', path: '/features' },
    { label: 'Calculator', path: '/calculator' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('/index')}
          className="text-left focus:outline-none"
        >
          <Logo />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mode Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs">
            <button
              onClick={() => setIsDemoMode(true)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                isDemoMode
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              DEMO DATA
            </button>
            <button
              onClick={() => setIsDemoMode(false)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                !isDemoMode
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              PRODUCTION
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="relative inline-block text-left">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold py-2 pl-3 pr-7 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {Object.keys(CURRENCIES).map((code) => (
                <option key={code} value={code}>
                  {code} ({CURRENCIES[code as CurrencyCode].symbol.trim()})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* User Auth / Enter App Button */}
          <button
            onClick={onEnterApp}
            className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate('/login')}
            className="sm:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            title="Login"
          >
            <LogIn className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
