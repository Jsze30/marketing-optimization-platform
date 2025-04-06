'use client';
import { useEffect, useState } from "react";
import { fetchBudgetForecast, fetchBudgetRecommendation } from "../utils/api";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BudgetForecast() {
  const [forecast, setForecast] = useState([]);
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    fetchBudgetForecast().then(setForecast);
    fetchBudgetRecommendation().then(data => setRecommendation(data.recommendation));
  }, []);

  return (
    <Card className="p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">🔮 Predictive Budgeting</h2>
      <CardContent className="p-0">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecast}>
            <XAxis dataKey="budget" />
            <YAxis dataKey="predicted_conversions" />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="predicted_conversions" stroke="#f59e0b" />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">💡 Recommendation</h3>
          <p>{recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
