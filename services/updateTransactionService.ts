import { supabase } from "@/lib/supabaseClient";

let intervalId: NodeJS.Timeout | null = null;

let placeholder_data = [
  {
    transaction_type: [
      "Send Money",
      "Cash In",
      "Cash Out",
      "Purchase",
      "Withdrawal",
      "Deposit",
      "Refund",
      "Reversal",
      "Chargeback",
      "Fees",
      "Interest",
      "Others",
    ],
    acquirer_payment_entity: [
      "Visa",
      "Mastercard",
      "American Express",
      "Discover",
      "Others",
    ],
    issuer_channel: ["ATM"],
    product: ["ProductA", "ProductB", "ProductC", "ProductD", "Others"],
    message_type: ["0200", "0300", "0400", "0800"],
    pos_entry_mode: ["Magnetic", "Chip", "Contactless", "Others"],
    response: [
      "200", //Approved
      "120", //Declined
      "121", //Insufficient funds
      "122", //Invalid card
      "00", //Invalid amount
    ],
    payment_company: ["CompanyA", "CompanyB", "CompanyC", "CompanyD"],
    acquirer_channel: ["ATM", "POS", "Web", "Mobile"],
    member_transaction: [false, true],
    member_decliner: [false, true],
    atm_id: [2910, 2930, 2950, 2970, 2971],
    failure_reason: [1, 2, 3, 4, 5],
    decliner_reason: [1, 2, 3, 4, 5],
  },
];

async function insertTransactionData() {
  const { error } = await supabase.from("TransactionData").insert([
    {
      id: Math.floor(100 + Math.random() * 900).toString(),
      atm_id:
        placeholder_data[0].atm_id[
          Math.floor(Math.random() * placeholder_data[0].atm_id.length)
        ],
      created_at: new Date().toISOString(),
      pan: "1234567890123456",
      transaction_type:
        placeholder_data[0].transaction_type[
          Math.floor(
            Math.random() * placeholder_data[0].transaction_type.length
          )
        ],
      stan: Math.floor(Math.random() * 100000).toString(), // Random STAN
      acquirer_channel:
        placeholder_data[0].acquirer_channel[
          Math.floor(
            Math.random() * placeholder_data[0].acquirer_channel.length
          )
        ],
      acquirer_payment_entity:
        placeholder_data[0].acquirer_payment_entity[
          Math.floor(
            Math.random() * placeholder_data[0].acquirer_payment_entity.length
          )
        ],
      issuer_channel:
        placeholder_data[0].issuer_channel[
          Math.floor(Math.random() * placeholder_data[0].issuer_channel.length)
        ],
      product:
        placeholder_data[0].product[
          Math.floor(Math.random() * placeholder_data[0].product.length)
        ],
      message_type:
        placeholder_data[0].message_type[
          Math.floor(Math.random() * placeholder_data[0].message_type.length)
        ],
      pos_entry_mode:
        placeholder_data[0].pos_entry_mode[
          Math.floor(Math.random() * placeholder_data[0].pos_entry_mode.length)
        ],
      response: "00",
      settlement_date: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toISOString(), // Tomorrow's date
      payment_company:
        placeholder_data[0].payment_company[
          Math.floor(Math.random() * placeholder_data[0].payment_company.length)
        ],
      actions: true,
      amount_transaction: Math.floor(
        Math.random() * (15000 - 5000) + 5000
      ),
      currency_transaction: "PKR",
      member_transaction:
        placeholder_data[0].member_transaction[
          Math.floor(
            Math.random() * placeholder_data[0].member_transaction.length
          )
        ],
      member_decliner:
        placeholder_data[0].member_decliner[
          Math.floor(Math.random() * placeholder_data[0].member_decliner.length)
        ],
      failure_reason:
        placeholder_data[0].failure_reason[
          Math.floor(Math.random() * placeholder_data[0].failure_reason.length)
        ],
      decliner_reason:
        placeholder_data[0].decliner_reason[
          Math.floor(Math.random() * placeholder_data[0].decliner_reason.length)
        ],
    },
  ]);

  if (error) {
    console.error("Error inserting data into Supabase:", error);
  } else {
    console.log("Data inserted successfully");
  }
}

export const startService = () => {
  if (!intervalId) {
    intervalId = setInterval(insertTransactionData, 3000);
    console.log("Transaction Insertion Service started.");
  }
};

export const stopService = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Transaction Insertion Service stopped.");
  }
};
