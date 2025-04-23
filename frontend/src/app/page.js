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
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
              <div className="flex-1 bg-white rounded-xl p-5 sm:p-6 shadow-xl border-l-4 border-emerald-500 hover:shadow-2xl transition-all hover:scale-[1.02] duration-300">
                <div className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Total Revenue</div>
                <div className="text-3xl sm:text-4xl font-bold mt-2 text-slate-800">$124,592</div>
                <div className="text-sm mt-2 flex items-center font-medium text-emerald-600">
                  <span className="flex items-center mr-1 bg-emerald-100 px-1.5 py-0.5 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-0.5">
                      <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                    </svg>
                    12.5%
                  </span>
                  <span className="text-slate-600">vs last month</span>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-xl p-5 sm:p-6 shadow-xl border-l-4 border-blue-500 hover:shadow-2xl transition-all hover:scale-[1.02] duration-300">
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Average ROAS</div>
                <div className="text-3xl sm:text-4xl font-bold mt-2 text-slate-800">3.2x</div>
                <div className="text-sm mt-2 flex items-center font-medium text-blue-600">
                  <span className="flex items-center mr-1 bg-blue-100 px-1.5 py-0.5 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-0.5">
                      <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                    </svg>
                    0.8x
                  </span>
                  <span className="text-slate-600">vs last month</span>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-xl p-5 sm:p-6 shadow-xl border-l-4 border-amber-500 hover:shadow-2xl transition-all hover:scale-[1.02] duration-300">
                <div className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Conversion Rate</div>
                <div className="text-3xl sm:text-4xl font-bold mt-2 text-slate-800">4.7%</div>
                <div className="text-sm mt-2 flex items-center font-medium text-amber-600">
                  <span className="flex items-center mr-1 bg-amber-100 px-1.5 py-0.5 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-0.5">
                      <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                    </svg>
                    0.3%
                  </span>
                  <span className="text-slate-600">vs last month</span>
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
