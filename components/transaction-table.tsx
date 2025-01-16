"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertTriangle,
  ArrowUpDown,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleStop,
  CreditCard,
  DollarSign,
  Maximize,
  Minus,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { BarGraph } from "./bar-graph";
import { HorizontalGraph } from "./horizontal-graph";
import { AreaGraph } from "./area-graph";
import { StackedBarGraph } from "./stacked-bargraph";
import { CardContent, CardHeader, CardTitle } from "./ui/card";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "atm_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ATM ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleString(),
  },
  {
    accessorKey: "Status",
    cell: ({ row }) => {
      const response: string | null = row.getValue("response") as string | null;

      return response === "Received" ? (
        <div className="w-[19%] text-center">
          <span
            className="rounded-2xl text-white font-medium py-1 px-2 text-base content-center"
            style={{ backgroundColor: "#007BFF" }} // Blue
          >
            Received
          </span>
        </div>
      ) : response === "In Progress" ? (
        <div className="w-[19%] text-center">
          <span
            className="rounded-2xl text-white font-medium py-1 px-2 text-base content-center"
            style={{ backgroundColor: "#FFA500" }} // Orange
          >
            In Progress
          </span>
        </div>
      ) : response === "Approved" ? (
        <div className="w-[19%] text-center">
          <span
            className="rounded-2xl text-white font-medium py-1 px-2 text-base content-center"
            style={{ backgroundColor: "#28A745" }} // Green
          >
            Approved
          </span>
        </div>
      ) : (
        <div className="w-[19%] text-center">
          <span
            className="rounded-2xl text-white font-medium py-1 px-2 text-base content-center"
            style={{ backgroundColor: "#DC3545" }} // Red
          >
            Rejected
          </span>
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Response
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PAN
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "transaction_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "stan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STAN
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "acquirer_channel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Acquirer Channel
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "acquirer_payment_entity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Acquirer Payment Entity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "issuer_channel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Issuer Channel
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "message_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Message Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pos_entry_mode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          POS Entry Mode
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "settlement_date",
    cell: ({ row }) =>
      new Date(row.getValue("settlement_date")).toLocaleDateString(),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Settlement Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "payment_company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount_transaction",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount_transaction"));
      return amount.toLocaleString();
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "currency_transaction",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Currency
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// type ChartDataItem = {
//   count: string;
//   lowCash: number;
//   invalidPin: number;
//   rejectedByIssuer: number;
//   networkFailure: number;
//   timeOut: number;
// };

type ChartDataItem = {
  failures: string;
  reasons: number;
  fill: string;
};

type HorizontalChartDataItem = {
  transaction: string;
  decliners: number;
  fill: string;
};

type AreaChartDataItem = {
  time: string;
  transactions: number;
  amount: number;
};

export function TransactionTable() {
  const { id } = useParams();

  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // const [columnVisibility, setColumnVisibility] =
  //   React.useState<VisibilityState>({});

  const [columnVisibility, setColumnVisibility] = React.useState({
    id: true,
    atm_id: true,
    created_at: true,
    response: true,
    pan: false,
    transaction_type: true,
    stan: false,
    acquirer_channel: false,
    acquirer_payment_entity: false,
    issuer_channel: false,
    product: false,
    message_type: false,
    pos_entry_mode: false,
    settlement_date: false,
    payment_company: false,
    amount_transaction: true,
    currency_transaction: false,
    actions: false,
  });

  const [rowSelection, setRowSelection] = React.useState({});
  // const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const [chartData, setChartData] = useState<ChartDataItem[]>([
    { failures: "lowCash", reasons: 0, fill: "var(--color-lowCash)" },
    { failures: "invalidPin", reasons: 0, fill: "var(--color-invalidPin)" },
    {
      failures: "rejectedByIssuer",
      reasons: 0,
      fill: "var(--color-rejectedByIssuer)",
    },
    {
      failures: "networkFailure",
      reasons: 0,
      fill: "var(--color-networkFailure)",
    },
    { failures: "timeOut", reasons: 0, fill: "var(--color-timeOut)" },
  ]);

  const [horizontalChartData, setHorizontalChartData] = useState<
    HorizontalChartDataItem[]
  >([
    { transaction: "scb", decliners: 0, fill: "var(--color-scb)" },
    { transaction: "bahl", decliners: 0, fill: "var(--color-bahl)" },
    { transaction: "hbl", decliners: 0, fill: "var(--color-hbl)" },
    { transaction: "national", decliners: 0, fill: "var(--color-national)" },
    { transaction: "bop", decliners: 0, fill: "var(--color-bop)" },
  ]);

  const getCurrentTimeWithOffset = (offsetInHours: number): string => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
    const targetTime = new Date(utc + offsetInHours * 3600000); // Apply offset
    return targetTime.toTimeString().split(" ")[0]; // Get "HH:mm:ss"
  };

  const [areaChartData, setAreaChartData] = useState<AreaChartDataItem[]>([
    { time: getCurrentTimeWithOffset(0), transactions: 0, amount: 0 }, // Adjust to UTC-5
  ]);

  const socketRef = useRef<Socket | null>(null);

  const updateTransactionData = (
    newEntry: any,
    eventType: string,
    oldEntry?: any
  ) => {
    if (!newEntry) return;

    if (eventType === "INSERT") {
      // Handle INSERT logic (same as before)
      setFilteredData((prevData) => [...prevData, newEntry]);
      handleChartDataUpdate(newEntry);
      handleHorizontalChartDataUpdate(newEntry);
      handleAreaChartDataUpdate(newEntry);
    } else if (eventType === "UPDATE" && oldEntry) {
      // Handle UPDATE logic: Compare `oldEntry` and `newEntry`
      const updatedData = filteredData.map((item) =>
        item.id === newEntry.id ? { ...item, ...newEntry } : item
      );
      setFilteredData(updatedData);

      // Update chart data based on the change
      handleChartDataUpdate(newEntry, oldEntry);
      handleHorizontalChartDataUpdate(newEntry, oldEntry);
      handleAreaChartDataUpdate(newEntry, oldEntry);
    } else if (eventType === "DELETE") {
      // Handle DELETE logic
      setFilteredData((prevData) =>
        prevData.filter((item) => item.id !== newEntry.id)
      );

      // Update chart data to remove the entry
      handleChartDataDelete(newEntry);
      handleHorizontalChartDataDelete(newEntry);
      handleAreaChartDataDelete(newEntry);
    }
  };

  const handleChartDataUpdate = (newEntry: any, oldEntry?: any) => {
    setChartData((prevData) => {
      // Map through each failure type in the chartData state
      const updatedData = prevData.map((item) => {
        // Check for "lowCash" failure reason
        if (
          item.failures === "lowCash" &&
          (newEntry.failure_reason === 1 || oldEntry?.failure_reason === 1)
        ) {
          return {
            ...item,
            reasons: item.reasons + (newEntry.failure_reason === 1 ? 1 : -1),
          };
        }

        // Check for "invalidPin" failure reason
        if (
          item.failures === "invalidPin" &&
          (newEntry.failure_reason === 2 || oldEntry?.failure_reason === 2)
        ) {
          return {
            ...item,
            reasons: item.reasons + (newEntry.failure_reason === 2 ? 1 : -1),
          };
        }

        // Check for "rejectedByIssuer" failure reason
        if (
          item.failures === "rejectedByIssuer" &&
          (newEntry.failure_reason === 3 || oldEntry?.failure_reason === 3)
        ) {
          return {
            ...item,
            reasons: item.reasons + (newEntry.failure_reason === 3 ? 1 : -1),
          };
        }

        // Check for "networkFailure" failure reason
        if (
          item.failures === "networkFailure" &&
          (newEntry.failure_reason === 4 || oldEntry?.failure_reason === 4)
        ) {
          return {
            ...item,
            reasons: item.reasons + (newEntry.failure_reason === 4 ? 1 : -1),
          };
        }

        // Check for "timeOut" failure reason
        if (
          item.failures === "timeOut" &&
          (newEntry.failure_reason === 5 || oldEntry?.failure_reason === 5)
        ) {
          return {
            ...item,
            reasons: item.reasons + (newEntry.failure_reason === 5 ? 1 : -1),
          };
        }

        // Return item unchanged if no update required
        return item;
      });

      // Return updated data sorted by the reasons in descending order
      return updatedData.sort((a, b) => b.reasons - a.reasons);
    });
  };

  const handleHorizontalChartDataUpdate = (newEntry: any, oldEntry?: any) => {
    setHorizontalChartData((prevData) => {
      // Check if the entry is for the "scb" transaction or other transaction types
      return prevData
        .map((item) => {
          if (item.transaction === "scb") {
            // Increment or decrement decliners based on failure reason
            if (newEntry.decliner_reason === 1) {
              return { ...item, decliners: item.decliners + 1 };
            } else if (oldEntry?.decliner_reason === 1) {
              return { ...item, decliners: item.decliners - 1 };
            }
          } else if (item.transaction === "bahl") {
            if (newEntry.decliner_reason === 2) {
              return { ...item, decliners: item.decliners + 1 };
            } else if (oldEntry?.decliner_reason === 2) {
              return { ...item, decliners: item.decliners - 1 };
            }
          } else if (item.transaction === "hbl") {
            if (newEntry.decliner_reason === 3) {
              return { ...item, decliners: item.decliners + 1 };
            } else if (oldEntry?.decliner_reason === 3) {
              return { ...item, decliners: item.decliners - 1 };
            }
          } else if (item.transaction === "national") {
            if (newEntry.decliner_reason === 4) {
              return { ...item, decliners: item.decliners + 1 };
            } else if (oldEntry?.decliner_reason === 4) {
              return { ...item, decliners: item.decliners - 1 };
            }
          } else if (item.transaction === "bop") {
            if (newEntry.decliner_reason === 5) {
              return { ...item, decliners: item.decliners + 1 };
            } else if (oldEntry?.decliner_reason === 5) {
              return { ...item, decliners: item.decliners - 1 };
            }
          }
          // Return item if no update is required
          return item;
        })
        .sort((a, b) => b.decliners - a.decliners); // Sort by decliners, descending
    });
  };

  const handleAreaChartDataUpdate = (newEntry: any, oldEntry?: any) => {
    const entryTime = new Date(newEntry.created_at);
    const timeKey = entryTime.toISOString().split("T")[1].split(".")[0]; // "12:44:00"

    setAreaChartData((prevData) => {
      const existingTimeSlot = prevData.find((item) => item.time === timeKey);

      if (existingTimeSlot) {
        return prevData.map((item) =>
          item.time === timeKey
            ? {
                ...item,
                transactions: item.transactions + 1,
                amount: item.amount + newEntry.amount_transaction,
              }
            : item
        );
      } else {
        return [
          ...prevData,
          {
            time: timeKey,
            transactions: 1,
            amount: newEntry.amount_transaction,
          },
        ];
      }
    });
  };

  const handleChartDataDelete = (deletedEntry: any) => {
    setChartData((prevData) => {
      return prevData.map((item) => {
        if (item.failures === "lowCash" && deletedEntry.failure_reason === 1) {
          return { ...item, reasons: item.reasons - 1 };
        }
        return item;
      });
    });
  };

  const handleHorizontalChartDataDelete = (deletedEntry: any) => {
    setHorizontalChartData((prevData) => {
      return prevData.map((item) => {
        if (item.transaction === "scb" && deletedEntry.decliner_reason === 1) {
          return { ...item, decliners: item.decliners - 1 };
        }
        return item;
      });
    });
  };

  const handleAreaChartDataDelete = (deletedEntry: any) => {
    if (!deletedEntry.old || !deletedEntry.old.id) {
      console.error("Delete entry is missing ID:", deletedEntry);
      return; // Exit if ID is missing
    }

    const timeKey = getCurrentTimeWithOffset(0); // Use a fallback time key if needed

    setAreaChartData((prevData) => {
      return prevData.map((item) => {
        // Replace the time comparison with the logic that handles 'id' or other unique fields
        if (item.time === timeKey) {
          return {
            ...item,
            transactions: item.transactions - 1,
            amount: item.amount - deletedEntry.old.amount_transaction, // Assuming amount_transaction exists in the payload
          };
        }
        return item;
      });
    });
  };

  const fetchData = async () => {
    try {
      let query = supabase
        .from("TransactionData")
        .select("*")
        .order("created_at", { ascending: true });

      if (id !== undefined) {
        query = query.eq("atm_id", Number(id));
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }
      // Update the response property to "Approved" in every object
      const updatedData = (data || []).map((item) => ({
        ...item,
        response: Math.random() > 0.5 ? "Approved" : "Rejected",
      }));

      // Set the updated data to the filtered data state
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("public:TransactionData")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "TransactionData" },
        (payload) => {
          const { eventType, new: newEntry, old: oldEntry } = payload;

          // Handle each event type
          if (eventType === "INSERT") {
            updateTransactionData(newEntry, eventType);
          } else if (eventType === "UPDATE") {
            updateTransactionData(newEntry, eventType, oldEntry);
          } else if (eventType === "DELETE") {
            updateTransactionData(newEntry, eventType);
          }
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (filteredData.length > 0) {
      const lastIndex = filteredData.length - 1;
      const updateState = async () => {
        if (filteredData[lastIndex].response === "00") {
          setFilteredData((prev) => {
            const updatedData = prev.map((item, index) =>
              index === lastIndex ? { ...item, response: "Received" } : item
            );
            return updatedData;
          });

          await new Promise((resolve) => setTimeout(resolve, 3000));
          setFilteredData((prev) => {
            const updatedData = prev.map((item, index) =>
              index === lastIndex ? { ...item, response: "In Progress" } : item
            );
            return updatedData;
          });

          await new Promise((resolve) => setTimeout(resolve, 3000));
          setFilteredData((prev) => {
            const updatedData = prev.map((item, index) =>
              index === lastIndex
                ? {
                    ...item,
                    response: Math.random() > 0.5 ? "Approved" : "Rejected",
                  }
                : item
            );
            return updatedData;
          });
        }
      };

      updateState();
    }
  }, [filteredData.length]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: { pageSize: 50 }, // Set initial page size to 50
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex gap-[20px]">
        {/* <div className="w-1/3">
          <StackedBarGraph />
        </div> */}
        <div className="w-1/2">
          <BarGraph chartData={chartData} />
        </div>
        <div className="w-1/2">
          <HorizontalGraph horizontalChartData={horizontalChartData} />
        </div>
      </div>
      <div className="mt-4">
        <AreaGraph areaChartData={areaChartData} />
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={
            (table.getColumn("transaction_type")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("transaction_type")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Drawer>
          <DrawerTrigger className="mt-3" asChild>
            <Button
              className="w-[36px] h-[36px] mt-0 ml-[10px]"
              variant="outline"
            >
              <Maximize />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="h-full">
            <CardHeader className="relative">
              <div className="flex items-center py-4">
                <CardTitle>Transaction Lists</CardTitle>
                <Input
                  placeholder="Search..."
                  value={
                    (table
                      .getColumn("transaction_type")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("transaction_type")
                      ?.setFilterValue(event.target.value)
                  }
                  className="ml-10 max-w-sm"
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Columns <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-b-[calc(var(--radius)-2px)] rounded-t-[calc(var(--radius)-2px)]">
                <Table className="min-w-full table-auto bg-gray-50 border-collapse rounded-b-[calc(var(--radius)-2px)] rounded-t-[calc(var(--radius)-2px)]">
                  <TableHeader className="bg-[#3f83ff]">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow
                        key={headerGroup.id}
                        className="border-b border-gray-300"
                      >
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="py-3 px-4 text-left text-sm font-semibold text-white"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>

                  <TableBody className="bg-gray-50">
                    <AnimatePresence>
                      {table.getRowModel().rows?.length ? (
                        [...table.getRowModel().rows].reverse().map((row) => (
                          <motion.tr
                            key={row.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.8 }}
                            data-state={row.getIsSelected() && "selected"}
                            className="border-b border-gray-300 hover:bg-blue-50"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                className="py-3 px-4 text-sm text-gray-700"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </motion.tr>
                        ))
                      ) : (
                        <TableRow className="text-center">
                          {/* <TableCell
                            colSpan={columns.length}
                            className="h-24 py-3 text-gray-500"
                          >
                            No results.
                          </TableCell> */}
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 py-3 text-center bg-gray-50 border-t border-gray-200"
                          >
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <Search className="w-10 h-10 text-gray-400" />
                              <p className="text-gray-500 text-sm font-medium">
                                No results found
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center space-x-6 lg:space-x-8 mt-4">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                      />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight />
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight />
                  </Button>
                </div>
              </div>
            </CardContent>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="rounded-b-[calc(var(--radius)-2px)] rounded-t-[calc(var(--radius)-2px)]">
        <Table className="min-w-full table-auto bg-gray-50 border-collapse rounded-b-[calc(var(--radius)-2px)] rounded-t-[calc(var(--radius)-2px)]">
          <TableHeader className="bg-[#3f83ff]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-300"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-3 px-4 text-left text-sm font-semibold text-white"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="bg-gray-50">
            <AnimatePresence>
              {table.getRowModel().rows?.length ? (
                [...table.getRowModel().rows].reverse().map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.8 }}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-gray-300 hover:bg-blue-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-3 px-4 text-sm text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow className="text-center">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 py-3 text-center bg-white border-t border-gray-200"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search className="w-10 h-10 text-gray-400" />
                      <p className="text-gray-500 text-sm font-medium">
                        No results found
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8 mt-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[50, 100, 150, 200].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
