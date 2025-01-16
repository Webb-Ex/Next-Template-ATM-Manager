"use client";

import { TransactionTable } from "@/components/transaction-table";
import { useParams } from "next/navigation";


import StartStopServiceButton from "@/components/startStopServiceButton";

const page = () => {
  const { id } = useParams();

  return (
    <div className="p-4 overflow-auto w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4 text-white">
          Transactions for ATM {id}
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
};

export default page;
