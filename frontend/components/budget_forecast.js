'use client';
import { useEffect, useState } from "react";
import { fetchBudgetForecast, fetchBudgetRecommendation } from "../utils/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center">
            <span className="mr-2">🔮</span>Predictive Budget Allocation
          </CardTitle>
          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
            AI-Optimized
          </Badge>
        </div>
        <CardDescription className="text-amber-100 mt-1">
          Conversion prediction model based on budget allocation scenarios
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
            <div className="rounded-md bg-white p-4 border border-amber-200 shadow-sm">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart 
                  data={forecast}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <XAxis 
                    dataKey="budget" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatCurrency}
                    label={{ value: 'Ad Budget', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="predicted_conversions" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    domain={['auto', 'auto']}
                    label={{ value: 'Predicted Conversions', angle: -90, position: 'insideLeft', offset: 10 }}
                  />
                  <Tooltip 
                    formatter={(value, name) => name === "predicted_conversions" ? 
                      [Math.round(value) + " conversions", "Predicted"] : 
                      [formatCurrency(value), "Budget"]} 
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  {optimalBudget && (
                    <ReferenceLine 
                      x={optimalBudget} 
                      stroke="#f97316" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      label={{ value: 'Optimal Budget', position: 'top', fill: '#f97316' }}
                    />
                  )}
                  <Line 
                    type="monotone" 
                    dataKey="predicted_conversions" 
                    stroke="#f97316" 
                    strokeWidth={3}
                    dot={{ stroke: '#f97316', strokeWidth: 2, fill: 'white', r: 4 }}
                    activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: '#f97316' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-lg font-medium mb-2 flex items-center text-amber-800">
                <span className="mr-2">💡</span>
                <span>AI Recommendation</span>
              </h3>
              <p className="text-amber-900">{recommendation}</p>
              {optimalBudget && (
                <div className="mt-3 flex items-center text-amber-800">
                  <span className="font-bold mr-1">Optimal Budget:</span> 
                  <span>{formatCurrency(optimalBudget)}</span>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="bg-amber-50 border-t border-amber-100 text-xs text-amber-700">
        <p>Based on historical performance data and conversion trends</p>
      </CardFooter>
    </Card>
  );
}
