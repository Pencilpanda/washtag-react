'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { UserPointsDisplay } from '@/components/user-points-display'
import { PointRedemption } from '@/components/point-redemption'
import { Button } from "@/components/ui/button"
import { getUserPoints } from '@/lib/api-utils'

export default function Checkout() {
  const { user } = useAuth()
  const [userPoints, setUserPoints] = useState(0)

  useEffect(() => {
    async function fetchUserPoints() {
      if (user) {
        try {
          const pointsData = await getUserPoints(user.id)
          setUserPoints(pointsData.points)
        } catch (err) {
          console.error('Failed to fetch user points:', err)
        }
      }
    }

    fetchUserPoints()
  }, [user])

  const handlePointRedemption = (redeemedPoints: number) => {
    // Update the order total based on redeemed points
    // This is a placeholder and should be implemented based on your specific requirements
    console.log(`Redeemed ${redeemedPoints} points`)
    setUserPoints(prevPoints => prevPoints - redeemedPoints)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {user && (
        <>
          <UserPointsDisplay userId={user.id} />
          <PointRedemption 
            userId={user.id} 
            availablePoints={userPoints} 
            onRedeem={handlePointRedemption} 
          />
        </>
      )}
      {/* Add your checkout form and order summary here */}
      <Button className="mt-6 bg-[#1CBA8D] hover:bg-[#19A67E]">
        Place Order
      </Button>
    </div>
  )
}

