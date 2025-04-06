'use client';
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function ABTestSuggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/meta/ab-test/suggestions")
      .then(res => setSuggestions(res.data));
  }, []);

  return (
    <Card className="p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">🧪 A/B Test Suggestions</h2>
      <CardContent className="p-0">
        {suggestions.length === 0 ? (
          <p className="text-gray-600">No A/B tests suggested at this time.</p>
        ) : (
          <ul className="space-y-4">
            {suggestions.map((item, i) => (
              <li key={i} className="bg-gray-100 rounded-xl p-4">
                <p className="font-medium text-lg">📣 {item.campaign_name}</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  {item.suggestions.map((s, j) => <li key={j}>{s}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
