import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "./ui/badge";
import { Banknote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import for animations

interface AtmTableNotesProps {
  atmId: number;
}

const AtmTableNotes: React.FC<AtmTableNotesProps> = ({ atmId }) => {
  const [cassetteData, setCassetteData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false); // Flag to track if data is fetched

  // Function to fetch the data initially
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("CassetteData")
        .select("*")
        .eq("atm_id", atmId);

      if (error) throw error;

      setCassetteData(data);
      setIsDataFetched(true); // Mark data as fetched
      console.log("Data fetched for ATM ID:", atmId, cassetteData);
    } catch (error) {
      console.error("Error fetching cassette data:", (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data whenever atmId changes
    console.log("Fetching data for ATM ID:", atmId);

    // Fetch initial data
    fetchData();

    // Subscribe to real-time changes for this atmId
    const channel = supabase
      .channel(`public:CassetteData:${atmId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "CassetteData" },
        (payload) => {
          // Handle real-time updates
          console.log("PayloadPayload", payload, atmId);

          if (payload.new && payload.new.atm_id === atmId) {
            // Update cassette data only if the atm_id matches
            setCassetteData((prevData) =>
              prevData.map((item) =>
                item.atm_id === payload.new.atm_id && item.id === payload.new.id
                  ? { ...item, ...payload.new }
                  : item
              )
            );
          }
        }
      )
      .subscribe();

    // Cleanup the subscription on component unmount or when atmId changes
    return () => {
      channel.unsubscribe();
    };
  }, [atmId]); // Add atmId as a dependency

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap">
      <AnimatePresence>
        {cassetteData.map((item) => (
          <motion.div
            key={item.id}
            className="flex justify-between "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Badge variant="outline" className="w-36 m-1">
              <Banknote className="w-4 me-1 text-green-700" />
              {item.denomination} : {item.notesRemaining}
            </Badge>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AtmTableNotes;
