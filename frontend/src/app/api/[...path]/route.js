import { NextResponse } from "next/server";

const routes = {
  "meta/insights": [
    { campaign_name: "Holiday Promo", spend: 8845.19, impressions: 404431, clicks: 11384, conversions: 2300, revenue: 113713.09, cluster: 2, performance_group: "Low ROI" },
    { campaign_name: "Retargeting Campaign", spend: 7766.82, impressions: 365084, clicks: 11301, conversions: 2312, revenue: 116853.68, cluster: 0, performance_group: "High ROI" },
    { campaign_name: "Spring Launch", spend: 8881.73, impressions: 380766, clicks: 12770, conversions: 2710, revenue: 133635.25, cluster: 1, performance_group: "Average" },
  ],
  "meta/recommendations": { recommendations: [
    "⚠️ *Holiday Promo* has poor performance. Suggest reducing budget or testing new creatives.",
    "🚀 *Retargeting Campaign* is performing well. Consider increasing budget by 15–20%.",
    "🔍 *Spring Launch* is average. Consider A/B testing audiences or adjusting spend gradually.",
  ] },
  "meta/budget/forecast": [
    { day: 30, budget: 100, predicted_conversions: 22.61 }, { day: 31, budget: 100, predicted_conversions: 22.49 }, { day: 32, budget: 100, predicted_conversions: 22.36 }, { day: 33, budget: 100, predicted_conversions: 22.24 }, { day: 34, budget: 100, predicted_conversions: 22.12 },
    { day: 30, budget: 250, predicted_conversions: 59.71 }, { day: 31, budget: 250, predicted_conversions: 59.59 }, { day: 32, budget: 250, predicted_conversions: 59.46 }, { day: 33, budget: 250, predicted_conversions: 59.34 }, { day: 34, budget: 250, predicted_conversions: 59.22 },
    { day: 30, budget: 400, predicted_conversions: 96.81 }, { day: 31, budget: 400, predicted_conversions: 96.68 }, { day: 32, budget: 400, predicted_conversions: 96.56 }, { day: 33, budget: 400, predicted_conversions: 96.44 }, { day: 34, budget: 400, predicted_conversions: 96.32 },
    { day: 30, budget: 500, predicted_conversions: 121.54 }, { day: 31, budget: 500, predicted_conversions: 121.42 }, { day: 32, budget: 500, predicted_conversions: 121.29 }, { day: 33, budget: 500, predicted_conversions: 121.17 }, { day: 34, budget: 500, predicted_conversions: 121.05 },
  ],
  "meta/budget/recommendation": { recommendation: "📊 Based on trends, a budget of $500 yields the best conversion return." },
  "meta/ab-test/suggestions": [
    { campaign_name: "Holiday Promo", suggestions: ["Try new ad creative or headline.", "This is a high-cost underperforming ad. Consider pausing or testing new audience targeting."] },
    { campaign_name: "Retargeting Campaign", suggestions: ["Try new ad creative or headline.", "Test landing page or call-to-action.", "This is a high-cost underperforming ad. Consider pausing or testing new audience targeting."] },
  ],
  "meta/roas": [
    { campaign_name: "Holiday Promo", average_customer_ltv: 324.47072289156625, spend: 8845.19, ROAS: 0.03668329599381882 },
    { campaign_name: "Retargeting Campaign", average_customer_ltv: 322.5263492063492, spend: 7766.82, ROAS: 0.041526177921768395 },
    { campaign_name: "Spring Launch", average_customer_ltv: 334.4098901098901, spend: 8881.73, ROAS: 0.037651436162762224 },
  ],
  "shopify/forecast": [
    { day: 31, predicted_revenue: 2027.393290322581 }, { day: 32, predicted_revenue: 2042.34335483871 }, { day: 33, predicted_revenue: 2057.293419354839 }, { day: 34, predicted_revenue: 2072.243483870968 }, { day: 35, predicted_revenue: 2087.193548387097 }, { day: 36, predicted_revenue: 2102.143612903226 }, { day: 37, predicted_revenue: 2117.093677419355 },
  ],
  "shopify/recommendations": { recommendations: [
    "📦 Best-selling product: *Smartwatch*. Consider boosting ads for this.",
    "♻️ Strong base of returning customers. Consider loyalty programs.",
    "📈 Predicted increase in revenue. Prepare for inventory demand.",
  ] },
};

export async function GET(_request, { params }) {
  const { path } = await params;
  const key = path.join("/");
  const data = routes[key];

  return data
    ? NextResponse.json(data)
    : NextResponse.json({ detail: "Not found" }, { status: 404 });
}
