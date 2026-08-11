import { NextRequest, NextResponse } from 'next/server';
import { MOCK_EXCHANGES, MOCK_OPPORTUNITIES } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('mode') || 'demo';

  if (mode === 'production') {
    try {
      // Fetch live price tick from public coin market ticker if available
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,dogecoin,cardano&vs_currencies=usd&include_24hr_change=true', {
        headers: { 'User-Agent': 'ArbitrageGo/1.0' },
        next: { revalidate: 10 },
      });
      if (res.ok) {
        const livePrices = await res.json();
        return NextResponse.json({
          success: true,
          mode: 'production',
          timestamp: new Date().toISOString(),
          prices: livePrices,
        });
      }
    } catch {
      // Fallback gracefully to demo structure
    }
  }

  // Return normalized market exchanges and prices
  return NextResponse.json({
    success: true,
    mode: 'demo',
    label: 'DEMO DATA',
    timestamp: new Date().toISOString(),
    exchanges: MOCK_EXCHANGES,
    sampleCount: MOCK_OPPORTUNITIES.length,
  });
}
