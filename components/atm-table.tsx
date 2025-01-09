"use client"

import * as React from "react"
import { MoreHorizontal, Plus, Trash, RefreshCw, Power, PowerOff } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Sample data for the table
const data = [
  {
    "Id": "2950",
    "TerminalId": "T001",
    "DisplayId": "4498",
    "IpAddress": "10.100.82.36",
    "ConfigurationGroup": "1947",
    "TLSEnabled": "TWO-WAY",
    "ProcessGroup": "1",
    "Make": "NCR",
    "Location": "PAKISTAN                 KHI          PK",
    "BranchCode": "2345",
    "City": "Karachi",
    "Region": "Sindh",
    "IsOffsite": "In-Premises",
    "CommsStatus": "Down",
    "State": "Pending",
    "ConfigLoadStatus": "100",
    "KeyLoadStatus": "Loaded",
    "IsMarkNonOperationalAllowed": true,
    "IsRestartATMAllowed": true,
  },
  // Add more sample data here...
]

export default function ATMTable() {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAllRows = () => {
    setSelectedRows((prev) =>
      prev.length === data.length ? [] : data.map((row) => row.Id)
    )
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'down':
        return 'destructive'
      case 'up':
        return 'default'
      default:
        return 'secondary'
    }
  }

  const getStateVariant = (state: string) => {
    switch (state.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'active':
        return 'success'
      default:
        return 'secondary'
    }
  }

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">ATM Management</h2>
        <div className="flex gap-2">
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
              <TableHead>Status</TableHead>
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
                  <div className="text-sm text-muted-foreground">Terminal: {row.TerminalId}</div>
                  <div className="text-sm text-muted-foreground">IP: {row.IpAddress}</div>
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
                  <div className="text-sm text-muted-foreground">Process: {row.ProcessGroup}</div>
                  <div className="text-sm text-muted-foreground">TLS: {row.TLSEnabled}</div>
                  <div className="text-sm text-muted-foreground">Make: {row.Make}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(row.CommsStatus)} className="mb-1">
                    {row.CommsStatus}
                  </Badge>
                  <Badge variant={getStateVariant(row.State)}>
                    {row.State}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Config</div>
                    <Progress value={parseInt(row.ConfigLoadStatus)} className="w-[60px]" />
                    <div className="text-sm text-muted-foreground">{row.ConfigLoadStatus}%</div>
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
                      <DropdownMenuItem disabled={!row.IsMarkNonOperationalAllowed}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/Monitoring/Transactions">View Transactions</Link>
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
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

