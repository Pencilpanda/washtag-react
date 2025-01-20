'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redeemPoints } from '@/lib/api-utils'

interface PointRedemptionProps {
  userId: number
  availablePoints: number
  onRedeem: (redeemedPoints: number) => void
}

export function PointRedemption({ userId, availablePoints, onRedeem }: PointRedemptionProps) {
  const [pointsToRedeem, setPointsToRedeem] = useState(0)

  const handleRedeem = async () => {
    try {
      await redeemPoints(userId, pointsToRedeem, 'Order discount')
      onRedeem(pointsToRedeem)
      setPointsToRedeem(0)
    } catch (err) {
      console.error('Failed to redeem points:', err)
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Redeem Points</h3>
      <p className="mb-2">Available points: {availablePoints}</p>
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          value={pointsToRedeem}
          onChange={(e) => setPointsToRedeem(Number(e.target.value))}
          max={availablePoints}
          min={0}
          className="w-24"
        />
        <Button onClick={handleRedeem} disabled={pointsToRedeem <= 0 || pointsToRedeem > availablePoints}>
          Redeem
        </Button>
      </div>
    </div>
  )
}

