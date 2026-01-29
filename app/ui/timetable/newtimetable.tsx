"use client";

import { useEffect, useState } from "react";
import { RetreivedTimetableBlocks } from "@/lib/definitions";

const startHour = 8;
const hoursCovered = 10;
const slotMinutes = 10;

const rows = (hoursCovered * 60) / slotMinutes;


const dow = ["Time","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const middow = ["Time","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const shortdow = ["","M","Tu","W","Th","F","Sa","Su"];

function timeToRow(time: string) {
  const [h, m] = time.split(":").map(Number);
  return ((h - startHour) * 60 + m) / slotMinutes;
}

export function TimetableGrid({ events = [], }: { events?: RetreivedTimetableBlocks[]; }) {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const labels =
    width > 900 ? dow :
    width > 600 ? middow :
    shortdow;

  return (
    <div className="overflow-auto border border-slate-700">
      <div
        className="grid grid-cols-[60px_repeat(7,1fr)] min-w-[700px]"
        style={{
          gridTemplateRows: `40px repeat(${rows}, 16px)`,
        }}
      >
        {/* ===== Header ===== */}
        {labels.map((label, i) => (
          <div
            key={`h-${i}`}
            className="
              sticky top-0 z-10
              flex items-center justify-center
              border border-slate-700
              bg-slate-800 text-white font-semibold text-sm
            "
            style={{ gridColumn: i + 1, gridRow: 1 }}
          >
            {label}
          </div>
        ))}

        {/* ===== Time Column ===== */}
        {Array.from({ length: rows }).map((_, i) => {
          const slotsPerHour = 60 / slotMinutes;
          const showLabel = i % slotsPerHour === 0;
          const hour = startHour + i / slotsPerHour;

          return (
            <div
              key={`t-${i}`}
              className="
                border border-slate-700
                text-xs text-slate-400
                pr-1 text-right
              "
              style={{ gridColumn: 1, gridRow: i + 2 }}
            >
              {showLabel && `${String(hour).padStart(2, "0")}:00`}
            </div>
          );
        })}

        {/* ===== Events ===== */}
        {events.map(e => {
          const start = Math.max(0, timeToRow(e.start_time));
          const end = Math.min(rows, timeToRow(e.end_time));

          if (end <= 0 || start >= rows) return null;

          return (
            <div
              key={e.id}
              className="
                rounded bg-blue-600 text-white text-xs
                px-1 py-0.5 m-[1px]
                overflow-hidden
              "
              style={{
                gridColumn: +e.day_of_week + 1,
                gridRow: `${start + 2} / ${end + 2}`,
              }}
            >
              <div className="flex justify-center py-1 font-bold">
                {e.subject}
              </div>
              <div className="flex align-text-bottom py-1">
                {e.location}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
