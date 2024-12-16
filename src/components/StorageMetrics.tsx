"use client";

import React from "react";
import { FileText, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const MetricButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    className={`h-7 px-3 inline-flex items-center gap-1.5 text-xs text-gray-950 font-medium
      bg-gray-100 hover:bg-gray-200 active:bg-gray-300
      rounded-full transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);

const storageData = [
  { name: "Used", value: 0.63, color: "rgb(20, 184, 166)" },
  { name: "Left", value: 0.37, color: "rgb(13, 148, 136)" },
];

const MetricCard = ({
  title,
  icon: Icon,
  usedSpace,
  leftSpace,
  data,
}: {
  title: string;
  icon: React.ElementType;
  usedSpace: number;
  leftSpace: number;
  data: any[];
}) => (
  <Card className="p-0 shadow-none rounded-xl h-full flex flex-col">
    <div className="flex items-center gap-2 py-2 px-3">
      <Icon className="h-5 w-5 text-black" />
      <span className="text-[14px] font-medium text-black">{title}</span>
    </div>
    <div className="flex-1 px-3 py-4">
      <div className="flex items-center justify-between h-full">
        <div className="space-y-1">
          <div className="text-[20px] font-medium text-left">
            {usedSpace} GB used
          </div>
          <div className="text-[20px] font-medium text-left text-gray-500">
            {leftSpace} GB left
          </div>
        </div>
        <div className="h-32 w-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={40}
                outerRadius={55}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base font-medium">
            {Math.round(storageData[0].value * 100)}%
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between p-3">
      <MetricButton>
        <Calendar className="h-3.5 w-3.5" />
        All Time
      </MetricButton>
      <MetricButton>View all →</MetricButton>
    </div>
  </Card>
);

export default function StorageMetrics() {
  return (
    <div className="h-full">
      <MetricCard
        title="File Space Usage"
        icon={FileText}
        usedSpace={0.63}
        leftSpace={0.37}
        data={storageData}
      />
    </div>
  );
}
