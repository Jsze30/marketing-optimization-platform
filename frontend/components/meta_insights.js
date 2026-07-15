'use client';
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { BarChart3, Lightbulb } from "lucide-react";
import { fetchMetaInsights, fetchMetaRecommendations } from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MetaInsights() {
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const insightsData = await fetchMetaInsights();
        const recData = await fetchMetaRecommendations();
        setInsights(insightsData);
        setRecommendations(recData.recommendations);
      } catch (error) {
        console.error("Failed to fetch Meta data:", error);
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
            <div className="eyebrow text-emerald-500">Meta Ads</div>
            <CardTitle className="mt-2 text-2xl font-medium tracking-tightest text-zinc-900">
              Meta Ads Performance
            </CardTitle>
            <CardDescription className="mt-1 font-light text-zinc-500">
              Revenue performance of active Meta advertising campaigns
            </CardDescription>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
            <BarChart3 className="h-5 w-5" />
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
                <BarChart
                  data={insights}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="metaRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34D399" stopOpacity={0.95} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.85} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="campaign_name"
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
                    cursor={{ fill: 'rgba(52, 211, 153, 0.08)' }}
                    formatter={(value) => [formatCurrency(value), "Revenue"]}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e4e4e7',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                      fontSize: '13px'
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                  <Bar
                    dataKey="revenue"
                    name="Revenue"
                    fill="url(#metaRevenue)"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-900">
                <Lightbulb className="h-4 w-4 text-emerald-500" />
                Action Recommendations
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {recommendations.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-100 border-l-2 border-l-emerald-400 bg-zinc-50 p-4 text-sm font-light text-zinc-600 transition-colors duration-300 hover:bg-zinc-100"
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="border-t border-zinc-100 bg-zinc-50/60 px-6 py-4 text-xs font-light text-zinc-400">
        Based on last 30 days of campaign data
      </CardFooter>
    </Card>
  );
}
