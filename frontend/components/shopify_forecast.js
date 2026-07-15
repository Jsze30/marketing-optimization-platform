'use client';
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { LineChart as LineChartIcon, Lightbulb } from "lucide-react";
import { fetchShopifyForecast, fetchShopifyRecommendations } from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopifyForecast() {
  const [forecast, setForecast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const forecastData = await fetchShopifyForecast();
        const recData = await fetchShopifyRecommendations();
        setForecast(forecastData);
        setRecommendations(recData.recommendations);
      } catch (error) {
        console.error("Failed to fetch Shopify data:", error);
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
            <div className="eyebrow text-emerald-500">Shopify · 30-Day Projection</div>
            <CardTitle className="mt-2 text-2xl font-medium tracking-tightest text-zinc-900">
              Shopify Revenue Forecast
            </CardTitle>
            <CardDescription className="mt-1 font-light text-zinc-500">
              Predicted revenue based on historical performance and current trends
            </CardDescription>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
            <LineChartIcon className="h-5 w-5" />
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
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#a1a1aa' }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#a1a1aa' }}
                    width={60}
                    tickFormatter={value => formatCurrency(value)}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value), "Predicted Revenue"]}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e4e4e7',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                      fontSize: '13px'
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                  <Line
                    type="monotone"
                    name="Predicted Revenue"
                    dataKey="predicted_revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ stroke: '#10b981', fill: '#ffffff', r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2, fill: '#34D399' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-900">
                <Lightbulb className="h-4 w-4 text-emerald-500" />
                Growth Opportunities
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {recommendations.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-sm font-light text-zinc-600 transition-colors duration-300 hover:bg-zinc-100"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-[11px] font-semibold text-emerald-600">
                      {i + 1}
                    </span>
                    <p>{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="border-t border-zinc-100 bg-zinc-50/60 px-6 py-4 text-xs font-light text-zinc-400">
        Based on machine learning predictions from historical sales data
      </CardFooter>
    </Card>
  );
}
