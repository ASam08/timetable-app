"use client";

import { useEffect, useState } from "react";
import { fetchNextBlock } from "@/lib/actions";
import { RetreivedTimetableBlocks } from "@/lib/definitions";

function timeToMinutes(time?: string | null): number | null {
  if (!time) return null;
  const [h, m] = time.slice(0, 5).split(":").map(Number);
  return h * 60 + m;
}

export default function NextCardClient() {
    const [block, setBlock] = useState<RetreivedTimetableBlocks | null>(null);
    const [loading, setLoading] = useState(true);
    const [minutesUntilNext, setMinutesUntilNext] = useState<number | null>(null);


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

      const Next = await fetchNextBlock(
        user_id,
        dayOfWeek,
        time
      );
        

        const nowMinutes = timeToMinutes(time);
        const nextMinutes = timeToMinutes(Next?.start_time);

        if (nowMinutes !== null && nextMinutes !== null) {
            setMinutesUntilNext(nextMinutes - nowMinutes - 1);
        } else {
            setMinutesUntilNext(null)
        }

        
      setBlock(Next);
        setLoading(false);
        
        
    };

    update(); // initial fetch
    const id = setInterval(update, 1_000);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div className="mt-6 w-1/3 max-w-64 p-4 border-2 border-dashed rounded-lg animate-pulse">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="mt-6 w-1/3 max-w-64 p-4 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">Looks like you're free for the rest of the day!</p>
      </div>
    );
  }

    
  return (
    <div className="mt-6 w-1/3 max-w-64 p-4 border-2 rounded-lg">
        <p className="text-sm text-gray-500">
            {minutesUntilNext === -1 && "Starting now"}
            {minutesUntilNext === 0 && "Starting in less than 1 minute"}
            {minutesUntilNext === 1 && "Starting in 1 minute"}
            {minutesUntilNext !== null && minutesUntilNext > 1 && `Starting in ${minutesUntilNext} minutes`}
        </p>
      <p className="font-bold">{block.subject}</p>
      <p className="text-sm">{block.location}</p>
      <p className="text-sm">
        Finishes at {block.end_time.slice(0, 5)}
      </p>
    </div>
  );
}
