"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const [tableData, setTableData] = useState([]);

  let socket: Socket;

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("TransactionData")
        .select("*");

      if (error) {
        throw new Error(error.message);
      }
      setTableData(data as []);
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    socket = io("http://localhost:3000");

    // Listen for table updates
    socket.on("updateTable", (data) => {
      setTableData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div>
        <h1>Supabase Table Example</h1>
        <button onClick={fetchData}>Fetch Data</button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((key) => (
                <TableHead key={key} className="w-[100px]">
                  {key}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              {Object.keys(row).map((key) => (
                <TableCell key={key} className="font-medium">
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
