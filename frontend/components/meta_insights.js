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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">
            <span className="mr-2">📈</span>Meta Ads Performance
          </CardTitle>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            Campaign Analysis
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          Revenue performance of active Meta advertising campaigns
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
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <Legend verticalAlign="top" height={36} />
                  <Bar 
                    dataKey="revenue" 
                    name="Revenue" 
                    fill="#4f46e5" 
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <span className="mr-2">💡</span>
                <span>Action Recommendations</span>
              </h3>
              <ul className="space-y-2">
                {recommendations.map((r, i) => (
                  <li key={i} className="bg-muted/50 rounded-lg p-3 pl-4 border-l-4 border-indigo-500 text-sm">
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
