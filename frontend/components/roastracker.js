'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

export default function ROASTracker() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:8000/api/meta/roas")
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching ROAS data:", error);
        setIsLoading(false);
      });
  }, []);

  // Function to determine badge color based on ROAS value
  const getRoasBadgeVariant = (roas) => {
    if (roas >= 4) return "success";
    if (roas >= 2) return "warning";
    return "destructive";
  };

  // Custom badge styles based on variant
  const badgeStyles = {
    success: "bg-emerald-100 text-emerald-800 border-emerald-200",
    warning: "bg-amber-100 text-amber-800 border-amber-200",
    destructive: "bg-rose-100 text-rose-800 border-rose-200"
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold flex items-center">
            <span className="mr-2">💰</span>Campaign ROAS Analysis
          </CardTitle>
          <Badge variant="outline" className="bg-white/20 text-white border-white/30">
            Lifetime Value / Ad Spend
          </Badge>
        </div>
        <CardDescription className="text-blue-100 mt-1">
          Performance analysis of ad campaigns based on customer lifetime value
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Campaign</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Avg Customer LTV</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">Ad Spend</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4 font-medium">{item.campaign_name}</td>
                    <td className="px-6 py-4">${item.average_customer_ltv.toFixed(2)}</td>
                    <td className="px-6 py-4">${item.spend.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="font-bold mr-2">{item.ROAS.toFixed(1)}x</span>
                        <Badge variant="outline" className={badgeStyles[getRoasBadgeVariant(item.ROAS)]}>
                          {item.ROAS >= 4 ? 'Excellent' : item.ROAS >= 2 ? 'Good' : 'Poor'}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
