'use client'

import { useState, useEffect } from 'react';
import { getCustomerPoints } from '@/lib/api-utils';

export function PointsBalance({ customerId }: { customerId: number }) {
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPoints() {
      try {
        setLoading(true);
        const pointsData = await getCustomerPoints(customerId);
        setPoints(pointsData.points);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching points'));
      } finally {
        setLoading(false);
      }
    }

    fetchPoints();
  }, [customerId]);

  if (loading) return <div>Loading points...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-[#1CBA8D] text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2 font-karla">Your Points Balance</h2>
      <p className="text-2xl font-inconsolata">{points} points</p>
    </div>
  );
}

