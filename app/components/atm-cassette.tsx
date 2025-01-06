import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Banknote,
  RefreshCw,
  ArrowDownToLine,
  Package,
  XCircle,
} from "lucide-react";

interface CassetteData {
  id: number;
  denomination: string;
  notesReplenished: number;
  notesRecycled: number;
  notesWithdrawn: number;
  notesRemaining: number;
  notesRejected: number;
}

interface ATMCassetteProps {
  data: CassetteData;
}

export function ATMCassette({ data }: ATMCassetteProps) {
  const items = [
    {
      label: "Notes Replenished",
      value: data.notesReplenished,
      icon: Banknote,
    },
    { label: "Notes Recycled", value: data.notesRecycled, icon: RefreshCw },
    {
      label: "Notes Withdrawn",
      value: data.notesWithdrawn,
      icon: ArrowDownToLine,
    },
    { label: "Notes Remaining", value: data.notesRemaining, icon: Package },
    { label: "Notes Rejected", value: data.notesRejected, icon: XCircle },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cassette {data.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-4">{data.denomination}</div>
        <div className="grid gap-4">
          {items.map((item, index) => (
            <div>
              <div key={index} className="flex items-center">
                <item.icon className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="flex-1">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
              <Separator className="my-1" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
