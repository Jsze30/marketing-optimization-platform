// components/ShopifyForecast.js
'use client';

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { fetchShopifyForecast, fetchShopifyRecommendations } from "../utils/api";

export default function ShopifyForecast() {
  const [forecast, setForecast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchShopifyForecast().then(setForecast);
    fetchShopifyRecommendations().then(setRecommendations);
  }, []);

  return (
    <div>
      <h2>🛍️ Shopify Revenue Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecast}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="predicted_revenue" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <h3>💡 Recommendations</h3>
      <ul>
        {recommendations && recommendations.length > 0 ? recommendations.map((r, i) => (
          <li key={i}>{r}</li>
        )) : <li>No recommendations available</li>}
      </ul>
    </div>
  );
}
