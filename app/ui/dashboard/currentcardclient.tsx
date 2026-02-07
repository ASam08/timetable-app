"use client";

import { useEffect, useState } from "react";
import { fetchCurrentBlock } from "@/lib/actions";
import { RetreivedTimetableBlocks } from "@/lib/definitions";
import { getUserID } from "@/lib/data";

export default function CurrentCardClient() {
  const [block, setBlock] = useState<RetreivedTimetableBlocks | null>(null);
  const [loading, setLoading] = useState(true);
  const [foundUserId, setFoundUserId] = useState(true);

  useEffect(() => {
    const update = async () => {
      const user_id = await getUserID();
      if (!user_id || user_id.length === 0) {
        setFoundUserId(false)
      } else {
        const now = new Date();
        // JS: Sun=0 → DB: Sun=7
        const jsDay = now.getDay();
        const dayOfWeek = jsDay === 0 ? 7 : jsDay;
        const time = now.toTimeString().slice(0, 8);
        const current = await fetchCurrentBlock(
          user_id,
          dayOfWeek,
          time
        );

        setBlock(current);
      }  
      setLoading(false);
    };

    update(); // initial fetch
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);


  if (!foundUserId) return (
        <div className="w-full md:w-1/3 max-w-64 p-4 border-2 border-dashed rounded-lg">
          <p className="text-gray-400">Nothing to see here, add a timetable to get started!</p>
        </div>
      );

  if (loading) {
    return (
      <div className="w-full md:w-1/3 max-w-64 p-4 border-2 border-dashed rounded-lg animate-pulse">
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="w-full md:w-1/3 max-w-64 p-4 border-2 border-dashed rounded-lg">
        <p className="text-gray-400">Nowhere to be right now!</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/3 max-w-64 p-4 border-2 rounded-lg">
      <p className="text-sm text-gray-400">Current</p>
      <p className="font-bold">{block.subject}</p>
      <p className="text-sm">{block.location}</p>
      <p className="text-sm">
        Finishes at {block.end_time.slice(0, 5)}
      </p>
    </div>
  );
}
