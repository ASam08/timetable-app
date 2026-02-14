"use client";

import { useEffect, useState } from "react";
import { fetchNextBreak } from "@/lib/actions";
import { RetreivedTimetableBlocks } from "@/lib/definitions";
import { getUserID } from "@/lib/data";

function timeToMinutes(time?: string | null): number | null {
  if (!time) return null;
  const [h, m] = time.slice(0, 5).split(":").map(Number);
  return h * 60 + m;
}

export default function NextBreakCardClient() {
  const [block, setBlock] = useState<RetreivedTimetableBlocks | null>(null);
  const [loading, setLoading] = useState(true);
  const [minutesUntilNext, setMinutesUntilNext] = useState<number | null>(null);
  const [startMinutes, setStartMinutes] = useState<number | null>(null);
  const [foundUserId, setFoundUserId] = useState(true);

  const fetchNextBreakTask = async () => {
    const user_id = await getUserID();

    if (!user_id) {
      setFoundUserId(false);
      return;
    }

    const now = new Date();
    const jsDay = now.getDay();
    const dayOfWeek = jsDay === 0 ? 7 : jsDay;
    const time = now.toTimeString().slice(0, 8);

    const next = await fetchNextBreak(user_id, dayOfWeek, time);
    setBlock(next);

    if (next?.start_time) {
      setStartMinutes(timeToMinutes(next.end_time));
    } else {
      setStartMinutes(null);
      setMinutesUntilNext(null);
    }

    setLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchNextBreakTask();
  }, []);

  useEffect(() => {
    if (startMinutes === null) return;

    const tick = () => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const diff = startMinutes - nowMinutes - 1;

      if (diff < 0) {
        // Block started → fetch next one
        fetchNextBreakTask();
        return;
      }

      setMinutesUntilNext(diff);
    };

    tick(); // run immediately
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startMinutes]);

  const hours =
    minutesUntilNext !== null && minutesUntilNext >= 60
      ? Math.floor(minutesUntilNext / 60)
      : null;

  const mins =
    hours !== null && minutesUntilNext !== null
      ? minutesUntilNext % 60
      : minutesUntilNext;

  if (!foundUserId) return null;

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
        <p className="text-gray-400">
          Looks like you're already on break!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/3 max-w-64 p-4 border-2 rounded-lg">
        <p className="font-bold">Next Break</p>
        <p className="text-sm">
        {minutesUntilNext === -1 && "Starting now "}
        {minutesUntilNext === 0 && "Starting in less than 1 minute "}
        {minutesUntilNext === 1 && "Starting in 1 minute "}
        {hours === null && minutesUntilNext! > 1 &&
          `Starting in ${minutesUntilNext} minutes `}
        {hours !== null &&
          `Starting in ${hours} hour${hours > 1 ? "s" : ""} and ${mins} minute${mins === 1 ? "" : "s"} `}
        at {block.end_time.slice(0,5)}
      </p>

    </div>
  );
}
