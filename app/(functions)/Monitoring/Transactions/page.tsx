"use client"

import { TransactionTable } from "@/components/transaction-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CircleStop, Play } from "lucide-react";
import StartStopServiceButton from "@/components/startStopServiceButton";

export default function Home() {

  return (
    <div className="p-4 overflow-auto w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4 text-white">
          Transactions for ATMs
        </h1>

        <div className="flex gap-1">
          <StartStopServiceButton serviceType="transactionService" />
        </div>
      </div>

      <div className="overflow-auto">
        <TransactionTable />
      </div>
    </div>
  );
}
