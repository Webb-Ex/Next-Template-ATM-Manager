"use client";

import * as React from "react";
import {
  MoreHorizontal,
  CirclePlus,
  Eye,
  Pen,
  ScrollText,
  FilePenLine,
  ChartCandlestick,
  Download,
  Power,
  CalendarDays,
  TextSearch,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample data for the table
const data = [
  {
    TemplateID: null,
    TemplateName: null,
    Id: "2950",
    DisplayId: "4498",
    IpAddress: "10.100.82.36",
    City: "Karachi, Pakistan",
    Location: "PAKISTAN                 KHI          PK",
    State: "Pending",
    CommsStatus: "Down",
    Make: "NCR",
    BranchCode: "2345",
    Region: "Sindh",
    IsOffsite: "In-Premises",
    ConfigurationGroup: "1947",
    ProcessGroupId: "1",
    IsMarkOperationalAllowed: false,
    IsMarkNonOperationalAllowed: true,
    IsSoftDeleteAllowed: false,
    IsUndoSoftDeleteAllowed: false,
    IsLoadConfigAllowed: false,
    IsLoadKeyAllowed: false,
    IsLoadDateTimeAllowed: false,
    IsRestartATMAllowed: true,
    IsOpenATMAllowed: false,
    IsCloseATMAllowed: false,
    IsInitializeAllowed: false,
    IsUpdateCredentialAllowed: false,
    IsAtmTemplateInUse: false,
    NonOperationalReason: null,
    KeyLoadStatus: "Loaded",
    ConfigLoadStatus: "100",
    TLSEnabled: "TWO-WAY",
  },
  {
    TemplateID: null,
    TemplateName: null,
    Id: "2970",
    DisplayId: "3002",
    IpAddress: "10.100.82.200",
    City: "Abakan, Khakassia, Russia",
    Location: "TPS                      ABA          RU",
    State: "Pending",
    CommsStatus: "Down",
    Make: "NCR",
    BranchCode: "2345",
    Region: "Sindh",
    IsOffsite: "In-Premises",
    ConfigurationGroup: "1947",
    ProcessGroupId: "1",
    IsMarkOperationalAllowed: false,
    IsMarkNonOperationalAllowed: true,
    IsSoftDeleteAllowed: false,
    IsUndoSoftDeleteAllowed: false,
    IsLoadConfigAllowed: false,
    IsLoadKeyAllowed: false,
    IsLoadDateTimeAllowed: false,
    IsRestartATMAllowed: true,
    IsOpenATMAllowed: false,
    IsCloseATMAllowed: false,
    IsInitializeAllowed: false,
    IsUpdateCredentialAllowed: false,
    IsAtmTemplateInUse: false,
    NonOperationalReason: null,
    KeyLoadStatus: "Not Loaded",
    ConfigLoadStatus: "0",
    TLSEnabled: "TWO-WAY",
  },
  {
    TemplateID: null,
    TemplateName: null,
    Id: "2910",
    DisplayId: "3001",
    IpAddress: "10.100.82.51",
    City: "Aachen, Germany",
    Location: "TPS                      AAH          DE",
    State: "Pending",
    CommsStatus: "Down",
    Make: "NCR",
    BranchCode: "2345",
    Region: "Sindh",
    IsOffsite: "In-Premises",
    ConfigurationGroup: "1947",
    ProcessGroupId: "1",
    IsMarkOperationalAllowed: false,
    IsMarkNonOperationalAllowed: true,
    IsSoftDeleteAllowed: false,
    IsUndoSoftDeleteAllowed: false,
    IsLoadConfigAllowed: false,
    IsLoadKeyAllowed: false,
    IsLoadDateTimeAllowed: false,
    IsRestartATMAllowed: true,
    IsOpenATMAllowed: false,
    IsCloseATMAllowed: false,
    IsInitializeAllowed: false,
    IsUpdateCredentialAllowed: false,
    IsAtmTemplateInUse: false,
    NonOperationalReason: null,
    KeyLoadStatus: "Loaded",
    ConfigLoadStatus: "0",
    TLSEnabled: "TWO-WAY",
  },
  {
    TemplateID: null,
    TemplateName: null,
    Id: "2930",
    DisplayId: "1020",
    IpAddress: "10.100.82.77",
    City: "Karachi, Pakistan",
    Location: "PAKISTAN                 KHI          PK",
    State: "In Service",
    CommsStatus: "Up",
    Make: "WINCOR",
    BranchCode: "2345",
    Region: "Sindh",
    IsOffsite: "In-Premises",
    ConfigurationGroup: "1947",
    ProcessGroupId: "1",
    IsMarkOperationalAllowed: false,
    IsMarkNonOperationalAllowed: false,
    IsSoftDeleteAllowed: false,
    IsUndoSoftDeleteAllowed: false,
    IsLoadConfigAllowed: true,
    IsLoadKeyAllowed: true,
    IsLoadDateTimeAllowed: true,
    IsRestartATMAllowed: false,
    IsOpenATMAllowed: true,
    IsCloseATMAllowed: true,
    IsInitializeAllowed: true,
    IsUpdateCredentialAllowed: false,
    IsAtmTemplateInUse: false,
    NonOperationalReason: null,
    KeyLoadStatus: "Loaded",
    ConfigLoadStatus: "100",
    TLSEnabled: "None",
  },
  {
    TemplateID: null,
    TemplateName: null,
    Id: "2971",
    DisplayId: "040989",
    IpAddress: "10.100.82.213",
    City: "Karachi, Pakistan",
    Location: "KARACHI                  KHI          PK",
    State: "Pending",
    CommsStatus: "Down",
    Make: "NCR",
    BranchCode: "2345",
    Region: "Sindh",
    IsOffsite: "In-Premises",
    ConfigurationGroup: "1947",
    ProcessGroupId: "1",
    IsMarkOperationalAllowed: false,
    IsMarkNonOperationalAllowed: true,
    IsSoftDeleteAllowed: false,
    IsUndoSoftDeleteAllowed: false,
    IsLoadConfigAllowed: false,
    IsLoadKeyAllowed: false,
    IsLoadDateTimeAllowed: false,
    IsRestartATMAllowed: true,
    IsOpenATMAllowed: false,
    IsCloseATMAllowed: false,
    IsInitializeAllowed: false,
    IsUpdateCredentialAllowed: false,
    IsAtmTemplateInUse: false,
    NonOperationalReason: null,
    KeyLoadStatus: "Not Loaded",
    ConfigLoadStatus: "0",
    TLSEnabled: "None",
  },
];

export default function DashboardPage() {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    setSelectedRows((prev) =>
      prev.length === data.length ? [] : data.map((row) => row.Id)
    );
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "down":
        return "destructive";
      case "up":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStateVariant = (state: string) => {
    switch (state.toLowerCase()) {
      case "pending":
        return "warning";
      case "active":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ATM Management</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <FilePenLine className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Disable Logs
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pen className="mr-2 h-4 w-4" />
                Log type Information
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ScrollText className="mr-2 h-4 w-4" />
                Log type Verbose
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon">
            <ChartCandlestick className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Power className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <CalendarDays className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ScrollText className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <CirclePlus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <TextSearch className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === data.length}
                  onCheckedChange={toggleAllRows}
                />
              </TableHead>
              <TableHead>ATM Info</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Configuration</TableHead>
              <TableHead>Comms/State</TableHead>
              <TableHead>Load Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
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
                    Terminal: {row.Id}
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
                    Process: {row.ProcessGroupId}
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
                    className="mb-1 mr-1"
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
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={!row.IsMarkNonOperationalAllowed}
                      >
                        <Pen className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ScrollText className="mr-2 h-4 w-4" />
                        Transactions
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
