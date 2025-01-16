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

export default function Home() {


  const startService = async (): Promise<void> => {
    try {
      const response: Response = await fetch("/api/transactionService", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to start the service.");
      }

      console.log("Service started.");
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const stopService = async (): Promise<void> => {
    try {
      const response: Response = await fetch("/api/transactionService", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to stop the service.");
      }

      console.log("Service stopped.");
    } catch (error) {
      console.error((error as Error).message);
    }
  };


  return (
    <div className="p-4 overflow-auto w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4 text-white">
          Transactions for ATMs
        </h1>

        <div className="flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon" onClick={startService}>
                  <Play className="h-4 w-4 text-green-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start Service</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon" onClick={stopService}>
                  <CircleStop className="h-4 w-4 text-red-700" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Stop Service</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="overflow-auto">
        <TransactionTable />
      </div>
    </div>
  );
}
