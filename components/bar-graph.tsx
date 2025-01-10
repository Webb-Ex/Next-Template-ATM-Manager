"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [{ count: "Transactions Count", member: 186, network: 80 }];

const chartConfig = {
  member: {
    label: "Member Transactions Count",
    color: "hsl(var(--chart-1))",
  },
  network: {
    label: "Network Transactions Count",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Failure Reasons</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="count"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="member" fill="var(--color-member)" radius={4} />
            <Bar dataKey="network" fill="var(--color-network)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing Failure Reasons
        </div>
      </CardFooter>
    </Card>
  );
}
