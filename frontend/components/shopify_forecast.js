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
  Legend,
} from "recharts";
import { fetchShopifyForecast, fetchShopifyRecommendations } from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center">
            <span className="mr-2">🛍️</span>Shopify Revenue Forecast
          </CardTitle>
          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
            30-Day Projection
          </Badge>
        </div>
        <CardDescription className="text-emerald-100 mt-1">
          Predicted revenue based on historical performance and current trends
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <>
            <div className="rounded-md bg-white p-4 border border-emerald-100 shadow-sm">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart 
                  data={forecast}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="day" 
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
                    formatter={(value) => [formatCurrency(value), "Predicted Revenue"]}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    name="Predicted Revenue"
                    dataKey="predicted_revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ stroke: '#10b981', fill: '#white', r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2, fill: '#10b981' }}
                    fill="url(#colorRevenue)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-medium mb-3 flex items-center text-emerald-800">
                <span className="mr-2">💡</span>
                <span>Growth Opportunities</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {recommendations.map((r, i) => (
                  <div 
                    key={i} 
                    className="group bg-gradient-to-r from-emerald-50 to-white p-4 rounded-lg border-l-4 border-emerald-500 text-sm text-emerald-800 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 bg-emerald-100 text-emerald-700 rounded-full w-5 h-5 flex items-center justify-center group-hover:bg-emerald-200">
                        {i + 1}
                      </div>
                      <p>{r}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="bg-emerald-50 border-t border-emerald-100 text-xs text-emerald-700">
        <p>Based on machine learning predictions from historical sales data</p>
      </CardFooter>
    </Card>
  );
}
