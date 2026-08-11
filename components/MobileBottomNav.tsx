'use client';

import React from 'react';
import { Home, Zap, Scale, Bell, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function MobileBottomNav({ currentPath, onNavigate }: MobileBottomNavProps) {
  const items = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Opportunities', path: '/opportunities', icon: Zap },
    { label: 'Markets', path: '/markets', icon: Scale },
    { label: 'Alerts', path: '/alerts', icon: Bell },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
              isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
