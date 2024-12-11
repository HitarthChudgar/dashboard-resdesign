"use client";

import React from "react";
import { Wrench, Building2, MessageSquareText, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
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
    const color = payload[0]?.payload?.color || payload[0]?.fill;
    return (
      <div className="bg-white px-2 py-1 border rounded-lg shadow-sm flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
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

const serviceData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 65 },
  { name: "Mar", value: 55 },
  { name: "Apr", value: 55 },
  { name: "May", value: 75 },
  { name: "Jun", value: 85 },
  { name: "Jul", value: 55 },
];

const amenityData = [
  { name: "Gym", value: 45 },
  { name: "Pool", value: 80 },
  { name: "Movie Room", value: 70 },
];

const communicationData = [
  { name: "Voice", value: 900, color: "hsl(171, 80%, 40%)" },
  { name: "SMS", value: 600, color: "hsl(212, 75%, 54%)" },
  { name: "Email", value: 700, color: "hsl(264, 100%, 66%)" },
];

const MetricCard = ({
  title,
  icon: Icon,
  total,
  data,
  layout = "horizontal",
}: {
  title: string;
  icon: React.ElementType;
  total: number;
  data: any[];
  layout?: "horizontal" | "vertical";
  showLegend?: boolean;
}) => (
  <Card className="p-0 shadow-none rounded-xl">
    <div className="flex items-center gap-2 py-2 px-3">
      <Icon className="h-5 w-5 text-black" />
      <span className="text-[14px] font-medium text-black">{title}</span>
    </div>
    <div className="text-2xl font-medium px-3 py-2 text-left">{total}</div>
    {data && (
      <div className="px-3 pt-4 pb-4 h-auto">
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={layout}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                horizontal={layout === "horizontal"}
                vertical={layout === "vertical"}
              />
              {layout === "horizontal" ? (
                <>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <YAxis hide />
                </>
              ) : (
                <>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                  />
                </>
              )}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#f3f4f6" }}
              />
              <Bar
                dataKey="value"
                radius={layout === "horizontal" ? [4, 4, 0, 0] : 4}
                fill={
                  layout === "horizontal" ? "hsl(171, 80%, 40%)" : undefined
                }
                barSize={layout === "vertical" ? 20 : undefined}
              >
                {layout === "vertical" &&
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )}
    <div className="flex items-center justify-between p-3">
      <MetricButton>
        <Calendar className="h-3.5 w-3.5" />
        This month
      </MetricButton>
      <MetricButton>View all →</MetricButton>
    </div>
  </Card>
);

export default function MetricCharts() {
  const serviceTotal = serviceData.reduce((sum, item) => sum + item.value, 0);
  const amenityTotal = amenityData.reduce((sum, item) => sum + item.value, 0);
  const communicationTotal = communicationData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard
        title="Service Requests"
        icon={Wrench}
        total={serviceTotal}
        data={serviceData}
      />
      <MetricCard
        title="Top 3 Amenities This Month"
        icon={Building2}
        total={amenityTotal}
        data={amenityData}
      />
      <MetricCard
        title="Email, Text & Voice"
        icon={MessageSquareText}
        total={communicationTotal}
        data={communicationData}
        layout="vertical"
        showLegend
      />
    </div>
  );
}
