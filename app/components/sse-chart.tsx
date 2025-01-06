"use client"

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function SSEChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const eventSource = new EventSource('/api/sse')

    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data)
      setData(prevData => {
        const updatedData = [...prevData, newData].slice(-10)
        return updatedData
      })
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="transactions" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

