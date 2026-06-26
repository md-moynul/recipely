"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#2E6FB5", "#E85D3D", "#B5870A", "#C0392B"];

export default function OverviewBarChart({ data }) {
  return (
    <div className="mt-6 rounded-2xl border border-[#EAE0D3] bg-white p-5 dark:border-[#3A332A] dark:bg-[#252019]">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#9C9388] dark:text-[#8A8074]">
        Platform Stats
      </h2>

      <div className="mt-4 h-72 w-full" style={{ minHeight: 288 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="horizontal"
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#EAE0D3" vertical={false} />
            <XAxis
              type="category"
              dataKey="label"
              tick={{ fill: "#6B6155", fontSize: 12 }}
              axisLine={{ stroke: "#EAE0D3" }}
              tickLine={false}
            />
            <YAxis
              type="number"
              allowDecimals={false}
              tick={{ fill: "#6B6155", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "#FBF1E6" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #EAE0D3",
                fontSize: 13,
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}