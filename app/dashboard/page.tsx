import { Suspense } from 'react'
import ATMTable from "../components/atm-table"
import ISRChart from "../components/isr-chart"
import SSEChart from "../components/sse-chart"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ATM Management Dashboard</h1>
      
      <div className="mb-8">
        <Suspense fallback={<div>Loading ATM data...</div>}>
          <ATMTable />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">ISR (Incremental Static Regeneration)</h2>
          <Suspense fallback={<div>Loading ISR chart...</div>}>
            <ISRChart />
          </Suspense>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">SSE (Server Sent Events)</h2>
          <Suspense fallback={<div>Loading SSE chart...</div>}>
            <SSEChart />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

