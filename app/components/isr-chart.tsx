"use client"

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// This function simulates fetching data from an API
const fetchData = async () => {
    const res = await fetch('/api/isr', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  }

export default function ISRChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const newData = await fetchData()
      setData(newData)
    }

    loadData()
    // Simulate ISR by refetching data every 10 seconds
    const interval = setInterval(loadData, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="transactions" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

