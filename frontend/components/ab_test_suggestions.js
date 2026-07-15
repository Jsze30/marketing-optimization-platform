'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FlaskConical, Megaphone, Info } from "lucide-react";
import axios from "axios";
import { API_BASE } from "../utils/api";

export default function ABTestSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${API_BASE}/meta/ab-test/suggestions`)
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
    <Card className="group animate-fade-in-up overflow-hidden rounded-[1.5rem] border-zinc-200 bg-white transition-all duration-300 hover:shadow-xl">
      <CardHeader className="border-b border-zinc-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow text-emerald-500">Experiments</div>
            <CardTitle className="mt-2 text-2xl font-medium tracking-tightest text-zinc-900">
              A/B Test Suggestions
            </CardTitle>
            <CardDescription className="mt-1 font-light text-zinc-500">
              Data-driven test ideas to boost campaign performance
            </CardDescription>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
            <FlaskConical className="h-5 w-5" />
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.length === 0 ? (
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8 text-center">
                <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white">
                  <Info className="h-5 w-5" />
                </div>
                <p className="font-medium text-zinc-900">No test suggestions available at this time.</p>
                <p className="mt-1 text-sm font-light text-zinc-500">Check back later as more campaign data is collected.</p>
              </div>
            ) : (
              suggestions.map((item, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50">
                  <div className="flex items-center justify-between border-b border-zinc-100 bg-white px-4 py-3">
                    <h3 className="flex items-center gap-2 text-sm font-medium text-zinc-900">
                      <Megaphone className="h-4 w-4 text-emerald-500" />
                      {item.campaign_name}
                    </h3>
                    <Badge className="border-transparent bg-emerald-400/15 text-emerald-600 hover:bg-emerald-400/25">
                      Test Opportunity
                    </Badge>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {item.suggestions.map((suggestion, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                          <span className="text-sm font-light text-zinc-600">{suggestion}</span>
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
      <CardFooter className="border-t border-zinc-100 bg-zinc-50/60 px-6 py-4 text-xs font-light text-zinc-400">
        Generated from campaign creative and performance signals
      </CardFooter>
    </Card>
  );
}
