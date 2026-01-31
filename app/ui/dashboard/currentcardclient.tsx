"use client";

import { useEffect, useState } from "react";
import { fetchCurrentBlock } from "@/lib/actions";
import { RetreivedTimetableBlocks } from "@/lib/definitions";

export default function CurrentCardClient() {
  const [block, setBlock] = useState<RetreivedTimetableBlocks | null>(null);
  const [loading, setLoading] = useState(true);

  const user_id = "123e4567-e89b-12d3-a456-426614174000"; // TODO: auth

  useEffect(() => {
    const update = async () => {
      const now = new Date();

      // JS: Sun=0 → DB: Sun=7
      const jsDay = now.getDay();
        const dayOfWeek = jsDay === 0 ? 7 : jsDay;
        console.log("Day of week:", dayOfWeek)

        const time = now.toTimeString().slice(0, 8);
        console.log("Time: ", time)

      const current = await fetchCurrentBlock(
        user_id,
        dayOfWeek,
        time
      );

      setBlock(current);
      setLoading(false);
    };

    update(); // initial fetch
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div className="mt-6 w-1/3 max-w-64 p-4 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="mt-6 w-1/3 max-w-64 p-4 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">No current block</p>
      </div>
    );
  }

  return (
    <div className="mt-6 w-1/3 max-w-64 p-4 border-2 rounded-lg">
      <p className="text-sm text-gray-500">Current</p>
      <p className="font-bold">{block.subject}</p>
      <p className="text-sm">{block.location}</p>
      <p className="text-sm">
        Finishes at {block.end_time.slice(0, 5)}
      </p>
    </div>
  );
}
