import Head from "next/head";
import MetaInsights from "../../components/meta_insights";
import ShopifyForecast from "../../components/shopify_forecast";
import BudgetForecast from "../../components/budget_forecast";
import ABTestSuggestions from "../../components/ab_test_suggestions";
import ROASTracker from "../../components/roastracker";


import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Marketing Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">📊 AI-Powered Marketing Dashboard</h1>

          <MetaInsights />
          <Separator className="my-10" />
          <ShopifyForecast />
          <Separator className="my-10" />
          <BudgetForecast />
          <ABTestSuggestions />
          <ROASTracker />
        </div>
      </div>
    </>
  );
}
