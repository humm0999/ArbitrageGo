import { NextRequest, NextResponse } from 'next/server';
import { MOCK_OPPORTUNITIES } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const asset = searchParams.get('asset');
  const minSpread = parseFloat(searchParams.get('minSpread') || '0');

  let opportunities = [...MOCK_OPPORTUNITIES];

  if (asset && asset !== 'ALL') {
    opportunities = opportunities.filter((o) => o.asset.toUpperCase() === asset.toUpperCase());
  }

  if (minSpread > 0) {
    opportunities = opportunities.filter((o) => o.grossSpreadPct >= minSpread);
  }

  // Inject a small jitter to simulate active live ticker updates
  const jittered = opportunities.map((opp) => {
    const jitter = (Math.random() - 0.5) * 0.05; // +/- 0.025%
    const newBuyPrice = opp.buyPrice * (1 + jitter * 0.1);
    const newSellPrice = opp.sellPrice * (1 - jitter * 0.1);
    const grossSpread = Math.max(0.1, newSellPrice - newBuyPrice);
    const grossSpreadPct = Number(((grossSpread / newBuyPrice) * 100).toFixed(2));
    const estimatedNetProfitUSD = Math.max(10, Math.round(grossSpread * 0.72));

    return {
      ...opp,
      buyPrice: Number(newBuyPrice.toFixed(2)),
      sellPrice: Number(newSellPrice.toFixed(2)),
      grossSpread: Number(grossSpread.toFixed(2)),
      grossSpreadPct,
      estimatedNetProfitUSD,
      estimatedNetRoiPct: Number((estimatedNetProfitUSD / 10000 * 100).toFixed(2)),
      dataAgeSeconds: Number((Math.random() * 0.8).toFixed(1)),
      updatedAt: new Date().toISOString(),
    };
  });

  return NextResponse.json({
    success: true,
    data: jittered,
    dataLabel: 'DEMO DATA',
    count: jittered.length,
    timestamp: new Date().toISOString(),
  });
}
