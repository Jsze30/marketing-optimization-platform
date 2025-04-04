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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            <span className="mr-2">🛍️</span>Shopify Revenue Forecast
          </CardTitle>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            30-Day Projection
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          Predicted revenue based on historical performance and current trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <>
            <div className="rounded-md bg-background p-3 border border-border/50">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart 
                  data={forecast}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
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
                  />
                  <Tooltip 
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
                    strokeWidth={2.5}
                    dot={{ stroke: '#10b981', fill: '#white', r: 4 }}
                    activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2, fill: '#10b981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <span className="mr-2">💡</span>
                <span>Action Recommendations</span>
              </h3>
              <ul className="space-y-2">
                {recommendations.map((r, i) => (
                  <li key={i} className="bg-muted/50 rounded-lg p-3 pl-4 border-l-4 border-emerald-500 text-sm">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
