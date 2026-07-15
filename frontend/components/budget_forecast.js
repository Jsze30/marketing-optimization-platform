'use client';
import { useEffect, useState } from "react";
import { fetchBudgetForecast, fetchBudgetRecommendation } from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function BudgetForecast() {
  const [forecast, setForecast] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [optimalBudget, setOptimalBudget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const forecastData = await fetchBudgetForecast();
        const recData = await fetchBudgetRecommendation();

        setForecast(forecastData);
        setRecommendation(recData.recommendation);

        // Find the optimal budget point (maximum efficiency)
        if (forecastData.length) {
          const maxEfficiency = forecastData.reduce((max, item) => {
            const efficiency = item.predicted_conversions / item.budget;
            return efficiency > max.efficiency ? { budget: item.budget, efficiency } : max;
          }, { budget: 0, efficiency: 0 });
          setOptimalBudget(maxEfficiency.budget);
        }
      } catch (error) {
        console.error("Failed to fetch budget data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="group animate-fade-in-up overflow-hidden rounded-[1.5rem] border-zinc-200 bg-white transition-all duration-300 hover:shadow-xl">
      <CardHeader className="border-b border-zinc-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow text-emerald-500">Budget · AI-Optimized</div>
            <CardTitle className="mt-2 text-2xl font-medium tracking-tightest text-zinc-900">
              Predictive Budget Allocation
            </CardTitle>
            <CardDescription className="mt-1 font-light text-zinc-500">
              Conversion prediction model based on budget allocation scenarios
            </CardDescription>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
            <Sparkles className="h-5 w-5" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[300px] w-full rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={forecast}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <XAxis
                    dataKey="budget"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#a1a1aa' }}
                    tickFormatter={formatCurrency}
                    label={{ value: 'Ad Budget', position: 'insideBottom', offset: -5, fill: '#a1a1aa', fontSize: 12 }}
                  />
                  <YAxis
                    dataKey="predicted_conversions"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#a1a1aa' }}
                    domain={['auto', 'auto']}
                    label={{ value: 'Predicted Conversions', angle: -90, position: 'insideLeft', offset: 10, fill: '#a1a1aa', fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value, name) => name === "predicted_conversions" ?
                      [Math.round(value) + " conversions", "Predicted"] :
                      [formatCurrency(value), "Budget"]}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e4e4e7',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                      fontSize: '13px'
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                  {optimalBudget && (
                    <ReferenceLine
                      x={optimalBudget}
                      stroke="#34D399"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      label={{ value: 'Optimal', position: 'top', fill: '#10b981', fontSize: 12 }}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="predicted_conversions"
                    stroke="#18181b"
                    strokeWidth={3}
                    dot={{ stroke: '#18181b', strokeWidth: 2, fill: '#ffffff', r: 4 }}
                    activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#34D399' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 rounded-xl border border-zinc-100 border-l-2 border-l-emerald-400 bg-zinc-50 p-5">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-900">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                AI Recommendation
              </h3>
              <p className="text-sm font-light leading-relaxed text-zinc-600">{recommendation}</p>
              {optimalBudget && (
                <div className="mt-4 flex items-center justify-between rounded-lg bg-white px-4 py-3">
                  <span className="eyebrow text-zinc-400">Optimal Budget</span>
                  <span className="text-lg font-medium tracking-tightest text-emerald-600">
                    {formatCurrency(optimalBudget)}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="border-t border-zinc-100 bg-zinc-50/60 px-6 py-4 text-xs font-light text-zinc-400">
        Based on historical performance data and conversion trends
      </CardFooter>
    </Card>
  );
}
