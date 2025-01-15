import React, { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "./ui/badge";
import { Info, SquareArrowOutUpRight } from "lucide-react";
import { Banknote } from "lucide-react";
import { Separator } from "@/components/ui/separator";
interface AtmTableHoverCardProps {
  atmId: number;
}

const AtmTableHoverCard: React.FC<AtmTableHoverCardProps> = ({ atmId }) => {
  const [cassetteData, setCassetteData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCassetteData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("CassetteData")
          .select("*")
          .eq("atm_id", atmId);

        if (error) throw error;

        setCassetteData(data);
      } catch (error) {
        console.error("Error fetching cassette data:", (error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCassetteData();
  }, [atmId]);

  if (loading) return <div>Loading...</div>;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge variant="secondary" className="cursor-pointer text-nowrap">
          <Info className="h-3 w-3 me-1" /> Cassette
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-[300px] p-4 bg-white border rounded-md shadow-md">
        <div className="text-lg font-semibold mb-4 flex items-center gap-1">
          Notes Remaining
          <SquareArrowOutUpRight className="w-4 cursor-pointer" />
        </div>
        <div className="grid gap-2">
          {cassetteData.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center">
                <div className="h-5 w-5 mr-2">
                  <Banknote className="text-green-400" />
                </div>

                <div className="flex justify-between w-full">
                  <span className="flex-1">{item.denomination}</span>
                  <span className="font-semibold">{item.notesRemaining}</span>
                </div>
              </div>
              <Separator className="" />
            </React.Fragment>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AtmTableHoverCard;
