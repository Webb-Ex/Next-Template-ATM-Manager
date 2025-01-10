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

let placeholder_data = [
  {
    transaction_type: ["Send Money", "Cash In", "Cash Out", "Purchase", "Withdrawal", "Deposit", "Refund", "Reversal", "Chargeback", "Fees", "Interest", "Others"],
    currency_transaction: ["USD", "EUR", "GBP", "JPY", "CNY"],
    acquirer_payment_entity: ["Visa", "Mastercard", "American Express", "Discover", "Others"],
    issuer_channel: ["iHost", "Mobile", "Web", "ATM"],
    product: ["ProductA", "ProductB", "ProductC", "ProductD", "Others"],
    message_type: ["0200", "0300", "0400", "0800"],
    pos_entry_mode: ["Magnetic", "Chip", "Contactless", "Others"],
    response: ["117 - Approved", "120 - Declined", "121 - Insufficient funds", "122 - Invalid card", "123 - Invalid amount"],
    payment_company: ["CompanyA", "CompanyB", "CompanyC", "CompanyD"],
    acquirer_channel: ["ATM", "POS", "Web", "Mobile"],


  }
];

// Function to insert data into Supabase
async function insertTransactionData() {
  const { error } = await supabase.from("TransactionData").insert([
    {
      id: Math.floor(100 + Math.random() * 900).toString(),
      created_at: new Date().toISOString(),
      pan: "1234567890123456",
      transaction_type: placeholder_data[0].transaction_type[Math.floor(Math.random() * placeholder_data[0].transaction_type.length)],
      stan: Math.floor(Math.random() * 100000).toString(), // Random STAN
      acquirer_channel: placeholder_data[0].acquirer_channel[Math.floor(Math.random() * placeholder_data[0].acquirer_payment_entity.length)],
      acquirer_payment_entity: placeholder_data[0].acquirer_payment_entity[Math.floor(Math.random() * placeholder_data[0].acquirer_payment_entity.length)],
      issuer_channel: placeholder_data[0].issuer_channel[Math.floor(Math.random() * placeholder_data[0].issuer_channel.length)],
      product: placeholder_data[0].product[Math.floor(Math.random() * placeholder_data[0].product.length)],
      message_type: placeholder_data[0].message_type[Math.floor(Math.random() * placeholder_data[0].message_type.length)],
      pos_entry_mode: placeholder_data[0].pos_entry_mode[Math.floor(Math.random() * placeholder_data[0].pos_entry_mode.length)],
      response: placeholder_data[0].response[Math.floor(Math.random() * placeholder_data[0].response.length)],
      settlement_date: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString(), // Tomorrow's date
      payment_company: placeholder_data[0].payment_company[Math.floor(Math.random() * placeholder_data[0].payment_company.length)],
      actions: true,
      amount_transaction: (Math.random() * 100).toFixed(2), // Random amount
      currency_transaction: placeholder_data[0].currency_transaction[Math.floor(Math.random() * placeholder_data[0].currency_transaction.length)],
    },
  ]);

  if (error) {
    console.error("Error inserting data into Supabase:", error);
  } else {
    console.log("Data inserted successfully");
  }
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

// Set up periodic insertion
setInterval(insertTransactionData, 5000); // Inserts data every 5 seconds

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
