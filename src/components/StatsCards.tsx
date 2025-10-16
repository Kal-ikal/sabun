import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { assetsApi } from "../utils/api";

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
}

function StatCard({ title, value, color = "text-blue-600" }: StatCardProps) {
  return (
    <Card className="p-3 md:p-6 hover:shadow-md transition-shadow">
      <div className="space-y-1 md:space-y-2">
        <p className="text-xs md:text-sm text-slate-600 truncate">{title}</p>
        <p className={`text-lg md:text-3xl font-bold ${color}`}>{value}</p>
      </div>
    </Card>
  );
}

export function StatsCards() {
  const [stats, setStats] = useState([
    { title: "Total Aset", value: "0", color: "text-blue-600" },
    { title: "Aset Dipinjamkan", value: "0", color: "text-orange-600" },
    { title: "Aset Tersedia", value: "0", color: "text-green-600" },
    { title: "Perlu Perawatan", value: "0", color: "text-red-600" },
  ]);

  useEffect(() => {
    // Calculate stats from server
    const calculateStats = async () => {
      try {
        const { assets } = await assetsApi.getAll();
        if (assets) {
          const total = assets.length;
          const dipinjamkan = assets.filter((a: any) => a.status === "Dipinjamkan").length;
          const tersedia = assets.filter((a: any) => a.status === "Tersedia").length;
          const perawatan = assets.filter((a: any) => a.status === "Perlu Perawatan").length;

          setStats([
            { title: "Total Aset", value: total.toString(), color: "text-blue-600" },
            { title: "Aset Dipinjamkan", value: dipinjamkan.toString(), color: "text-orange-600" },
            { title: "Aset Tersedia", value: tersedia.toString(), color: "text-green-600" },
            { title: "Perlu Perawatan", value: perawatan.toString(), color: "text-red-600" },
          ]);
        }
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };

    calculateStats();
    
    // Refresh stats periodically
    const intervalId = setInterval(calculateStats, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
}