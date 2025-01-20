'use client'

import { useState, useEffect } from 'react'
import { getUserPoints } from '@/lib/api-utils'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserPointsDisplayProps {
  userId: number
}

export function UserPointsDisplay({ userId }: UserPointsDisplayProps) {
  const [points, setPoints] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPoints() {
      try {
        setLoading(true)
        const pointsData = await getUserPoints(userId)
        setPoints(pointsData.points)
      } catch (err) {
        setError('Failed to fetch user points')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPoints()
  }, [userId])

  if (loading) return <div>Loading points...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Points Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{points} credits</p>
      </CardContent>
    </Card>
  )
}

