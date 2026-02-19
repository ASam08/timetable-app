"use client";

import { useEffect, useState } from "react";
import { fetchCurrentBlock } from "@/lib/actions";
import { RetreivedTimetableBlocks } from "@/lib/definitions";
import { LucidePlay } from "lucide-react";

function timeToMinutes(time?: string | null): number | null {
  if (!time) return null;
  const [h, m] = time.slice(0, 5).split(":").map(Number);
  return h * 60 + m;
}

export default function CurrentCardClient() {
  const [block, setBlock] = useState<RetreivedTimetableBlocks | null>(null);
  const [loading, setLoading] = useState(true);
  const [foundUserId, setFoundUserId] = useState(true);
  const [endMinutes, setEndMinutes] = useState<number | null>(null);

  const fetchCurrent = async () => {
    const now = new Date();
    const jsDay = now.getDay();
    const dayOfWeek = jsDay === 0 ? 7 : jsDay;
    const time = now.toTimeString().slice(0, 8);

    const current = await fetchCurrentBlock(dayOfWeek, time);
    // Distinguish the "no user" sentinel from a valid response of "no current block"
    if (
      current &&
      ((current as any).reason === "no-user" ||
        (current as any).reason === "no-set")
    ) {
      setFoundUserId(false);
      setLoading(false);
      return;
    }

    // No current block
    if (!current) {
      setBlock(null);
      setEndMinutes(null);
      setLoading(false);
      return;
    }

    setBlock(current as RetreivedTimetableBlocks);

    if ((current as RetreivedTimetableBlocks).end_time) {
      setEndMinutes(
        timeToMinutes((current as RetreivedTimetableBlocks).end_time),
      );
    } else {
      setEndMinutes(null);
    }

    setLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchCurrent();
  }, []);

  useEffect(() => {
    if (endMinutes === null) return;

    const tick = () => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      // If block has ended → refetch
      if (nowMinutes >= endMinutes) {
        fetchCurrent();
      }
    };

    tick(); // run immediately
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endMinutes]);

  if (!foundUserId) {
    return (
      <div className="w-full max-w-64 rounded-lg border-2 border-dashed p-4 md:w-1/3">
        <p className="text-gray-400">
          Nothing to see here, add a timetable to get started!
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full max-w-64 animate-pulse rounded-lg border-2 border-dashed p-4 md:w-1/3">
        <LucidePlay className="float-right text-green-600" />
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  if (!block) {
    return (
      <div className="w-full max-w-64 rounded-lg border-2 border-dashed p-4 md:w-1/3">
        <LucidePlay className="float-right text-green-600" />
        <p className="text-gray-400">Nowhere to be right now!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-64 rounded-lg border-2 p-4 md:w-1/3">
      <LucidePlay className="float-right text-green-600" />
      <p className="text-sm text-gray-400">Current</p>
      <p className="font-bold">{block.subject}</p>
      <p className="text-sm">{block.location}</p>
      <p className="text-sm">Finishes at {block.end_time.slice(0, 5)}</p>
    </div>
  );
}
