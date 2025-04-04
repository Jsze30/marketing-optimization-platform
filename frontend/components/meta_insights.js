// components/MetaInsights.js
'use client';
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { fetchMetaInsights, fetchMetaRecommendations } from "../utils/api";

export default function MetaInsights() {
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchMetaInsights().then(setInsights);
    fetchMetaRecommendations().then(setRecommendations);
  }, []);

  return (
    <div>
      <h2>📈 Meta Ads Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={insights}>
          <XAxis dataKey="campaign_name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
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
