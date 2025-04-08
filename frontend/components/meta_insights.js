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
  Legend,
} from "recharts";
import { fetchMetaInsights, fetchMetaRecommendations } from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center">
            <span className="mr-2">📈</span>Meta Ads Performance
          </CardTitle>
          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
            Campaign Analysis
          </Badge>
        </div>
        <CardDescription className="text-blue-100 mt-1">
          Revenue performance of active Meta advertising campaigns
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4 mt-4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <>
            <div className="rounded-md bg-white p-4 border border-indigo-100 shadow-sm">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={insights}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <XAxis 
                    dataKey="campaign_name" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    width={60}
                    tickFormatter={value => formatCurrency(value)}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
                    formatter={(value) => [formatCurrency(value), "Revenue"]} 
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    content={({ payload }) => (
                      <div className="flex justify-center">
                        {payload.map((entry, index) => (
                          <div key={`legend-${index}`} className="flex items-center mx-2">
                            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: entry.color }} />
                            <span className="text-sm font-medium">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  <Bar 
                    dataKey="revenue" 
                    name="Revenue" 
                    fill="url(#colorRevenue)" 
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.95}/>
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-medium mb-3 flex items-center text-indigo-900">
                <span className="mr-2">💡</span>
                <span>Action Recommendations</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {recommendations.map((r, i) => (
                  <div 
                    key={i} 
                    className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500 text-sm text-indigo-800 hover:shadow-md transition-shadow duration-300"
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="bg-indigo-50 border-t border-indigo-100 text-xs text-indigo-600">
        <p>Based on last 30 days of campaign data</p>
      </CardFooter>
    </Card>
  );
}
