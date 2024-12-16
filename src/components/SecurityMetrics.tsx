"use client";

import React from "react";
import { Shield, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-2 py-1 border rounded-lg shadow-sm flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "rgb(20, 184, 166)" }}
        />
        <span className="text-sm">
          <span className="text-muted-foreground text-sm">{label}</span>{" "}
          <span className="text-sm">{payload[0].value}</span>
        </span>
      </div>
    );
  }
  return null;
};

const securityData = [
  { name: "Mon", value: 4 },
  { name: "Tue", value: 6 },
  { name: "Wed", value: 3 },
  { name: "Thu", value: 8 },
  { name: "Fri", value: 4 },
  { name: "Sat", value: 2 },
  { name: "Sun", value: 3 },
];

const MetricCard = ({
  title,
  icon: Icon,
  total,
  data,
}: {
  title: string;
  icon: React.ElementType;
  total: number;
  data: any[];
}) => (
  <Card className="p-0 shadow-none rounded-xl h-full">
    <div className="flex items-center gap-2 py-2 px-3">
      <Icon className="h-5 w-5 text-black" />
      <span className="text-[14px] font-medium text-black">{title}</span>
    </div>
    <div className="text-2xl font-medium px-3 py-2 text-left">{total}</div>
    {data && (
      <div className="px-3 pt-4 pb-4 h-auto">
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: "#f3f4f6" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="rgb(20, 184, 166)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )}
    <div className="flex items-center justify-between p-3">
      <MetricButton>
        <Calendar className="h-3.5 w-3.5" />
        Last 30 days
      </MetricButton>
      <MetricButton>View all →</MetricButton>
    </div>
  </Card>
);

export default function SecurityMetrics() {
  const securityTotal = securityData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full max-w-md">
      <MetricCard
        title="Security Activity"
        icon={Shield}
        total={securityTotal}
        data={securityData}
      />
    </div>
  );
}
