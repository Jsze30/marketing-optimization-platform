'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet } from "lucide-react";
import axios from "axios";
import { API_BASE } from "../utils/api";

export default function ROASTracker() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${API_BASE}/meta/roas`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching ROAS data:", error);
        setIsLoading(false);
      });
  }, []);

  // ROAS tier → monochrome + emerald treatment
  const getRoasTier = (roas) => {
    if (roas >= 4) return { label: 'Excellent', style: 'bg-emerald-400/15 text-emerald-600' };
    if (roas >= 2) return { label: 'Good', style: 'bg-zinc-900/5 text-zinc-700' };
    return { label: 'Poor', style: 'bg-zinc-900/5 text-zinc-400' };
  };

  return (
    <Card className="animate-fade-in-up overflow-hidden rounded-[1.5rem] border-zinc-200 bg-white transition-all duration-300 hover:shadow-xl">
      <CardHeader className="border-b border-zinc-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow text-emerald-500">Return on Ad Spend</div>
            <CardTitle className="mt-2 text-2xl font-medium tracking-tightest text-zinc-900">
              Campaign ROAS Analysis
            </CardTitle>
            <CardDescription className="mt-1 font-light text-zinc-500">
              Performance analysis of ad campaigns based on customer lifetime value
            </CardDescription>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
            <Wallet className="h-5 w-5" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="space-y-4 p-6">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="px-6 py-4"><span className="eyebrow text-zinc-400">Campaign</span></th>
                  <th className="px-6 py-4"><span className="eyebrow text-zinc-400">Avg Customer LTV</span></th>
                  <th className="px-6 py-4"><span className="eyebrow text-zinc-400">Ad Spend</span></th>
                  <th className="px-6 py-4"><span className="eyebrow text-zinc-400">ROAS</span></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => {
                  const tier = getRoasTier(item.ROAS);
                  return (
                    <tr key={i} className="border-b border-zinc-50 transition-colors hover:bg-zinc-50">
                      <td className="px-6 py-4 text-sm font-medium text-zinc-900">{item.campaign_name}</td>
                      <td className="px-6 py-4 text-sm font-light text-zinc-600">${item.average_customer_ltv.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm font-light text-zinc-600">${item.spend.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-medium tracking-tightest text-zinc-900">{item.ROAS.toFixed(1)}x</span>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tier.style}`}>
                            {tier.label}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-zinc-100 bg-zinc-50/60 px-6 py-4 text-xs font-light text-zinc-400">
        Lifetime value / ad spend, measured across active campaigns
      </CardFooter>
    </Card>
  );
}
