"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AreaGraphData {
  areaChartData: Array<{
    time: string;
    transactions: number;
    amount: number;
  }>;
}

// const chartData = [
//   { date: "2024-04-01", time: 222, mobile: 150 },
//   { date: "2024-04-02", desktop: 97, mobile: 180 },
//   { date: "2024-04-03", desktop: 167, mobile: 120 },
// ];

const chartConfig = {
  visitors: {
    label: "Transactions",
  },
  transactions: {
    label: "Number of Transactions",
    color: "hsl(var(--chart-1))",
  },
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaGraph({ areaChartData }: AreaGraphData) {
  // const [timeRange, setTimeRange] = React.useState("2m");

  // const filteredData = areaChartData.filter((item) => {
  //   const currentTime = new Date();

  //   // Make sure the time is correctly parsed from the "HH:mm:ss" format
  //   const itemTimeParts = item.time.split(":");
  //   if (itemTimeParts.length !== 3) return false; // Skip invalid time formats

  //   // Create a Date object for itemTime (set today's date and the parsed time)
  //   const itemTime = new Date(currentTime);
  //   itemTime.setHours(Number(itemTimeParts[0]), Number(itemTimeParts[1]), Number(itemTimeParts[2]), 0);

  //   let timeDifference;

  //   // Get the time in milliseconds
  //   const currentTimeMs = currentTime.getTime();
  //   const itemTimeMs = itemTime.getTime();

  //   if (timeRange === "2m") {
  //     timeDifference = currentTimeMs - itemTimeMs;
  //     return timeDifference <= 2 * 60 * 1000; // Last 2 minutes
  //   } else if (timeRange === "1m") {
  //     timeDifference = currentTimeMs - itemTimeMs;
  //     return timeDifference <= 1 * 60 * 1000; // Last 1 minute
  //   } else if (timeRange === "30s") {
  //     timeDifference = currentTimeMs - itemTimeMs;
  //     return timeDifference <= 30 * 1000; // Last 30 seconds
  //   }

  //   return false;
  // });

  // console.log("areaChartDataareaChartData", filteredData, areaChartData)

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Transactions Snapshot</CardTitle>
        </div>
        {/* <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 2 minutes" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="2m" className="rounded-lg">
              Last 2 minutes
            </SelectItem>
            <SelectItem value="1m" className="rounded-lg">
              Last 1 minute
            </SelectItem>
            <SelectItem value="30s" className="rounded-lg">
              Last 30 seconds
            </SelectItem>
          </SelectContent>
        </Select> */}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={areaChartData}>
            <defs>
              <linearGradient id="fillTransactions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-transactions)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-transactions)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-amount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-amount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const time = new Date(`1970-01-01T${value}Z`); // assuming the time is in 24-hour format (HH:mm:ss)
                return time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const time = new Date(`1970-01-01T${value}Z`); // assuming the time is in 24-hour format (HH:mm:ss)
                    return time.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="amount"
              type="natural"
              fill="url(#fillAmount)"
              stroke="var(--color-amount)"
              stackId="a"
            />
            <Area
              dataKey="transactions"
              type="natural"
              fill="url(#fillTransactions)"
              stroke="var(--color-transactions)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
