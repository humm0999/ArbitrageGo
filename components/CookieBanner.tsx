'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('arbitragego_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('arbitragego_cookie_consent', 'all');
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('arbitragego_cookie_consent', 'essential');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-5 shadow-2xl text-slate-800">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-sm text-slate-900">Cookie & Privacy Notice</h4>
          </div>
          <button
            onClick={handleRejectNonEssential}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          ArbitrageGo uses essential cookies for secure authentication and performance analytics. We do not sell your data.
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleAcceptAll}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition shadow-sm shadow-blue-500/20"
          >
            Accept All
          </button>
          <button
            onClick={handleRejectNonEssential}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium px-3.5 py-2 rounded-xl transition"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={() => setShowPreferences(true)}
            className="text-xs text-blue-600 hover:underline font-medium ml-auto"
          >
            Preferences
          </button>
        </div>
      </div>

      {showPreferences && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Cookie Preferences</h3>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-4 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Essential Cookies</span>
                  <span>Required for secure logins, CSRF protection, and platform routing.</span>
                </div>
                <span className="text-blue-600 font-bold text-[11px] bg-blue-100 px-2 py-0.5 rounded">Always Active</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Performance & Market Analytics</span>
                  <span>Helps us optimize order book latency and spread calculation speeds.</span>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  localStorage.setItem('arbitragego_cookie_consent', 'custom');
                  setShowPreferences(false);
                  setShowBanner(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-5 py-2.5 rounded-xl transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
