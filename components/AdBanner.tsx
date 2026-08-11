'use client';

import React, { useEffect, useRef } from 'react';
import { DollarSign, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: object[];
  }
}

export function AdBanner({
  slotId = '1234567890',
  format = 'auto',
  style,
  className = '',
  label = 'Sponsored Advertisement',
}: AdBannerProps) {
  const adSenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adSenseId && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [adSenseId]);

  if (adSenseId) {
    return (
      <div className={`my-4 overflow-hidden rounded-xl bg-gray-50 border border-gray-200 text-center p-2 ${className}`}>
        <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
          {label}
        </div>
        <ins
          className="adsbygoogle"
          style={style || { display: 'block' }}
          data-ad-client={adSenseId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Demo / Placeholder Ad Banner matching High Density Theme
  return (
    <div
      ref={adRef}
      className={`my-4 p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50/80 text-[#0A192F] shadow-2xs relative overflow-hidden group ${className}`}
    >
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-2 mb-2">
        <div className="flex items-center space-x-2">
          <span className="px-1.5 py-0.5 bg-blue-600 text-white font-black text-[9px] uppercase tracking-wider rounded">
            Google Ad
          </span>
          <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
            {label}
          </span>
        </div>
        <a
          href="https://www.google.com/adsense/start/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
        >
          <span>Apply AdSense</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs py-1">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-[#0A192F]">
              Google AdSense Placement Ready
            </div>
            <div className="text-[10px] text-gray-500 font-medium">
              Configure <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-[9.5px]">NEXT_PUBLIC_GOOGLE_ADSENSE_ID</code> in Netlify env vars to serve live ads.
            </div>
          </div>
        </div>

        <a
          href="https://www.google.com/adsense/start/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-md uppercase tracking-wider transition shrink-0"
        >
          Monetize App
        </a>
      </div>
    </div>
  );
}
