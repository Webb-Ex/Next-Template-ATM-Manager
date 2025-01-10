import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://ajfgwfendpumnrsztmuz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZmd3ZmVuZHB1bW5yc3p0bXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMjU5NjEsImV4cCI6MjA1MTgwMTk2MX0.GhIWCzBqkRhpQffbJ0ZYhHCKAcoQIj-zxP2WX3Ixf6c";
const supabase = createClient(supabaseUrl, supabaseKey);

// Utility to generate random data for transactions
function generateRandomTransaction() {
  const transactionTypes = ["Purchase", "Refund", "Cash Withdrawal"];
  const channels = ["Online", "Mobile", "POS"];
  const entities = ["Visa", "MasterCard", "American Express"];
  const products = ["ProductA", "ProductB", "ProductC"];
  const responseTypes = ["Success", "Failure", "Pending"];
  const companies = ["CompanyA", "CompanyB", "CompanyC"];

  return {
    id: Math.floor(100 + Math.random() * 900).toString(),
    created_at: new Date().toISOString(),
    pan: Math.random().toString().slice(2, 18),
    transaction_type:
      transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
    stan: Math.floor(10000 + Math.random() * 90000).toString(),
    acquirer_channel: channels[Math.floor(Math.random() * channels.length)],
    acquirer_payment_entity:
      entities[Math.floor(Math.random() * entities.length)],
    issuer_channel: channels[Math.floor(Math.random() * channels.length)],
    product: products[Math.floor(Math.random() * products.length)],
    message_type: "Authorization",
    pos_entry_mode: ["Magnetic", "Chip", "Contactless"][
      Math.floor(Math.random() * 3)
    ],
    response: responseTypes[Math.floor(Math.random() * responseTypes.length)],
    settlement_date: new Date().toISOString(),
    payment_company: companies[Math.floor(Math.random() * companies.length)],
    actions: Math.random() < 0.5,
    amount_transaction: (Math.random() * 500).toFixed(2),
    currency_transaction: ["USD", "EUR", "GBP"][Math.floor(Math.random() * 3)],
  };
}

// Function to insert random transaction data into the table
async function insertRandomTransaction() {
  const transaction = generateRandomTransaction();
  try {
    const { data, error } = await supabase
      .from("TransactionData")
      .insert([transaction]); // Pass as array for single insert

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted:", data);
    }
  } catch (err) {
    console.error("Unexpected error during insertion:", err);
  }
}

// Random interval generator (1 to 10 seconds)
function getRandomInterval() {
  return Math.floor(Math.random() * 10) + 1;
}

// Automation loop to insert data at random intervals
async function runAutomation() {
  console.log("Starting automation...");
  while (true) {
    await insertRandomTransaction();

    // Generate random interval and delay
    const delay = getRandomInterval();
    console.log(`Waiting for ${delay} seconds before the next insertion...`);
    await new Promise((resolve) => setTimeout(resolve, delay * 1000));
  }
}

// Start the automation process
runAutomation();
