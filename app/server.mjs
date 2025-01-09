import { Server } from "socket.io";
import { createServer } from "http";
import { createClient } from "@supabase/supabase-js";
 
// Supabase configuration
const SUPABASE_URL = "https://ajfgwfendpumnrsztmuz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZmd3ZmVuZHB1bW5yc3p0bXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMjU5NjEsImV4cCI6MjA1MTgwMTk2MX0.GhIWCzBqkRhpQffbJ0ZYhHCKAcoQIj-zxP2WX3Ixf6c";
 
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 
const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Allow requests from localhost:3001
    methods: ["GET", "POST"],
  },
});
 
// Function to fetch data from Supabase
async function fetchTransactionData() {
  const { data, error } = await supabase.from("TransactionData").select("*");
  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return [];
  }
  return data;
}
 
// Realtime listener for database changes
supabase
  .channel("transaction-data")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "TransactionData" },
    async (payload) => {
      console.log("Change detected:", payload);
      const updatedData = await fetchTransactionData();
      io.emit("updateTable", updatedData); // Notify clients
    }
  )
  .subscribe();
 
io.on("connection", async (socket) => {
  console.log("Client connected");
 
  // Send initial data
  const initialData = await fetchTransactionData();
  socket.emit("updateTable", initialData);
 
  socket.on("disconnect", () => console.log("Client disconnected"));
});
 
server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);