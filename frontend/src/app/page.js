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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header Section with gradient background */}
        <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-8 px-6 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              <span className="inline-block transform -rotate-3 mr-2">📊</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Marketing Dashboard
              </span>
            </h1>
            <div className="hidden md:flex space-x-2">
              <div className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium">AI-Powered</div>
              <div className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium">Real-time</div>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="px-6 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Quick Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 shadow-lg text-white">
                <div className="text-sm font-medium opacity-80">Total Revenue</div>
                <div className="text-3xl font-bold">$124,592</div>
                <div className="text-xs mt-1 flex items-center">
                  <span className="inline-block mr-1">↑ 12.5%</span> vs last month
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 shadow-lg text-white">
                <div className="text-sm font-medium opacity-80">Average ROAS</div>
                <div className="text-3xl font-bold">3.2x</div>
                <div className="text-xs mt-1 flex items-center">
                  <span className="inline-block mr-1">↑ 0.8x</span> vs last month
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 shadow-lg text-white">
                <div className="text-sm font-medium opacity-80">Conversion Rate</div>
                <div className="text-3xl font-bold">4.7%</div>
                <div className="text-xs mt-1 flex items-center">
                  <span className="inline-block mr-1">↑ 0.3%</span> vs last month
                </div>
              </div>
            </div>
            
            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MetaInsights />
              <ShopifyForecast />
            </div>
            
            <Separator className="opacity-30" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BudgetForecast />
              <div className="space-y-8">
                <ABTestSuggestions />
              </div>
            </div>
            
            <div className="mt-8">
              <ROASTracker />
            </div>
            
            {/* Footer with timestamp */}
            <div className="text-center text-sm text-slate-500 mt-10 pt-4 border-t border-slate-200">
              <p>Last updated: April 7, 2025 • Data refreshes every 6 hours</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
