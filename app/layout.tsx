import type { Metadata } from 'next';
import './globals.css';
import { GoogleAdSense } from '@/components/GoogleAdSense';

export const metadata: Metadata = {
  title: 'ArbitrageGo PRO - High-Density Crypto & DEX Arbitrage Scanner',
  description: 'Real-time multi-exchange crypto, DEX, triangular, and funding rate arbitrage opportunity scanner.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <GoogleAdSense />
        {children}
      </body>
    </html>
  );
}

