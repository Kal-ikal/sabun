import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "./ui/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "#2563EB",
  iconBg = "#EFF6FF",
}: StatsCardProps) {
  const changeColor = {
    increase: "text-[#10B981]",
    decrease: "text-[#EF4444]",
    neutral: "text-[#64748B]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-surface rounded-lg p-6 border border-border-color shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[#64748B] mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-[#1E293B] mb-2">{value}</h3>
          {change && (
            <p className={cn("text-sm font-medium", changeColor[changeType])}>
              {change}
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
      </div>
    </motion.div>
  );
}
