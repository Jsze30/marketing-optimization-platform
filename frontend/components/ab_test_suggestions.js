'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

export default function ABTestSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:8000/api/meta/ab-test/suggestions")
      .then(res => {
        setSuggestions(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching A/B test suggestions:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-600 to-purple-700 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold flex items-center">
            <span className="mr-2">🧪</span>A/B Test Suggestions
          </CardTitle>
          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
            Performance Optimizer
          </Badge>
        </div>
        <CardDescription className="text-violet-100 mt-1">
          Data-driven test ideas to boost campaign performance
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.length === 0 ? (
              <div className="bg-violet-50 rounded-lg p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 text-violet-600 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <p className="text-violet-700 font-medium">No test suggestions available at this time.</p>
                <p className="text-violet-500 text-sm mt-1">Check back later as more campaign data is collected.</p>
              </div>
            ) : (
              suggestions.map((item, i) => (
                <div key={i} className="bg-gradient-to-b from-violet-50 to-white rounded-lg border border-violet-100 overflow-hidden">
                  <div className="bg-violet-100/70 px-4 py-3 border-b border-violet-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-violet-800 flex items-center">
                        <span className="mr-2">📣</span> {item.campaign_name}
                      </h3>
                      <Badge className="bg-violet-200 text-violet-800 hover:bg-violet-300">
                        Test Opportunity
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {item.suggestions.map((suggestion, j) => (
                        <li key={j} className="flex items-start">
                          <div className="text-violet-600 mr-2 mt-0.5">•</div>
                          <span className="text-sm text-slate-800">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
