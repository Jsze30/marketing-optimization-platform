'use client';
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function ROASTracker() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/meta/roas").then(res => setData(res.data));
  }, []);

  return (
    <Card className="p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">💰 Campaign ROAS (LTV / Spend)</h2>
      <CardContent className="p-0">
        <table className="w-full table-auto text-left mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Campaign</th>
              <th className="px-4 py-2">Avg Customer LTV</th>
              <th className="px-4 py-2">Spend</th>
              <th className="px-4 py-2">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{item.campaign_name}</td>
                <td className="px-4 py-2">${item.average_customer_ltv.toFixed(2)}</td>
                <td className="px-4 py-2">${item.spend.toFixed(2)}</td>
                <td className="px-4 py-2">{item.ROAS.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
