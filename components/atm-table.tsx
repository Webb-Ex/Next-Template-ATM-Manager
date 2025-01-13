"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Plus,
  Trash,
  RefreshCw,
  Power,
  PowerOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ATMTableSkeleton } from "./skeletons/atm-table-skeleton";
import { supabase } from "@/lib/supabaseClient";

export default function ATMTable() {
  const [atmData, setAtmData] = React.useState<any[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const itemsPerPage = 10;
  const socketRef = React.useRef<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("ATMs").select("*");

      if (error) {
        throw new Error(error.message);
      }

      setAtmData(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    console.log("Fetching data...");

    fetchData();

    const channel = supabase
      .channel("public:ATMs")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "ATMs" },
        (payload) => {
          // Handle the real-time update
          console.log("Update payload:", payload);

          setAtmData((prevData) =>
            prevData.map((atm) =>
              atm.Id === payload.new.Id ? payload.new : atm
            )
          );
        }
      )
      .subscribe();

    // Cleanup on component unmount
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const totalPages = Math.ceil(atmData.length / itemsPerPage);
  const paginatedData = atmData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    setSelectedRows((prev) =>
      prev.length === atmData.length ? [] : atmData.map((row) => row.Id)
    );
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "down":
        return "destructive";
      case "up":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStateVariant = (state: string) => {
    switch (state.toLowerCase()) {
      case "pending":
        return "outline";
      case "active":
        return "default";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return <ATMTableSkeleton />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="">
          <h2 className="text-xl">ATM Profiles</h2>
        </div>
        <div className="flex gap-2">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Change Log Type</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>

              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Change Status</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>

              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Load Settings</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>

              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Change State</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === paginatedData.length}
                  onCheckedChange={toggleAllRows}
                />
              </TableHead>
              <TableHead>ATM Info</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Configuration</TableHead>
              <TableHead>Comms / Status</TableHead>
              <TableHead>Load Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.Id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(row.Id)}
                    onCheckedChange={() => toggleRowSelection(row.Id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">ID: {row.DisplayId}</div>
                  <div className="text-sm text-muted-foreground">
                    Terminal: {row.TerminalId}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    IP: {row.IpAddress}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{row.Location}</div>
                  <div className="text-sm text-muted-foreground">
                    {row.City}, {row.Region}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Branch: {row.BranchCode} ({row.IsOffsite})
                  </div>
                </TableCell>
                <TableCell>
                  <div>Group: {row.ConfigurationGroup}</div>
                  <div className="text-sm text-muted-foreground">
                    Process: {row.ProcessGroup}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    TLS: {row.TLSEnabled}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Make: {row.Make}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusVariant(row.CommsStatus)}
                    className="mb-1 me-1"
                  >
                    {row.CommsStatus}
                  </Badge>
                  <Badge variant={getStateVariant(row.State)}>
                    {row.State}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Config</div>
                    <Progress
                      value={parseInt(row.ConfigLoadStatus)}
                      className="w-[60px]"
                    />
                    <div className="text-sm text-muted-foreground">
                      {row.ConfigLoadStatus}%
                    </div>
                  </div>
                  <div className="text-sm mt-2">Key: {row.KeyLoadStatus}</div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem disabled={!row.IsRestartATMAllowed}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={!row.IsMarkNonOperationalAllowed}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/Monitoring/Transactions/${row.Id}`}>
                          View Transactions
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
