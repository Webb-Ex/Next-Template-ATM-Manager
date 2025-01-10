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
  const { data, error } = await supabase
    .from("TransactionData")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return [];
  }
  return data;
}

// Function to insert data into Supabase
async function insertTransactionData() {
  const { error } = await supabase.from("TransactionData").insert([
    {
      id: Math.floor(100 + Math.random() * 900).toString(),
      created_at: new Date().toISOString(),
      pan: "1234567890123456",
      transaction_type: "Purchase",
      stan: Math.floor(Math.random() * 100000).toString(), // Random STAN
      acquirer_channel: "Online",
      acquirer_payment_entity: "Visa",
      issuer_channel: "Mobile",
      product: "ProductA",
      message_type: "Authorization",
      pos_entry_mode: "Magnetic",
      response: "Success",
      settlement_date: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString(), // Tomorrow's date
      payment_company: "CompanyA",
      actions: true,
      amount_transaction: (Math.random() * 100).toFixed(2), // Random amount
      currency_transaction: "USD",
    },
  ]);

  if (error) {
    console.error("Error inserting data into Supabase:", error);
  } else {
    console.log("Data inserted successfully");
  }
}

supabase
  .channel("transaction-data")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "TransactionData" },
    async (payload) => {
      console.log("Change detected:", payload);
      const updatedData = await fetchTransactionData();
      io.emit("updateTable", updatedData);
    }
  )
  .subscribe();

setInterval(insertTransactionData, 5000);

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
