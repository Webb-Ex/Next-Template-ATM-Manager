"use client";

import React from "react";
import dynamic from "next/dynamic";

import { TrendingUp } from "lucide-react";

import Highcharts from 'highcharts'


const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
    ssr: false,
  });

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


if (typeof Highcharts === "object") {
    // Dynamically load required Highcharts modules
    if (typeof window !== "undefined") {
      const HighchartsExporting = require("highcharts/modules/exporting");
      const HighchartsTilemap = require("highcharts/modules/tilemap");
  
      HighchartsExporting(Highcharts);
      HighchartsTilemap(Highcharts);
    }
  }


const ATMHeatMap = () => {



  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>ATM Heatmap</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
        <HighchartsReact highcharts={Highcharts} options={[]} />


        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            5.2% ATMs down as of today <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing live ATM stats across the city
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ATMHeatMap;
