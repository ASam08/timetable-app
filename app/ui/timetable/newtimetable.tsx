"use client";

import { useEffect, useState } from "react";
import { RetreivedTimetableBlocks } from "@/lib/definitions";
import { LucideEdit2, LucideX } from "lucide-react";
import { deleteBlock } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const startHour = 8;
const hoursCovered = 9;
const slotMinutes = 15;

const rows = (hoursCovered * 60) / slotMinutes;

const dow = ["Time","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const middow = ["Time","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const shortdow = ["Time","M","Tu","W","Th","F","Sa","Su"];

const minSlotMinutes = 5; // Always use 5-minute resolution
const virtualRows = (hoursCovered * 60) / minSlotMinutes;
const slotsPerHour = 60 / minSlotMinutes;
const visibleSlotInterval = slotMinutes / minSlotMinutes;

function timeToRow(time: string) {
  const [h, m] = time.split(":").map(Number);
  return ((h - startHour) * 60 + m) / minSlotMinutes;
}

export function TimetableGrid({ events = [], }: { events?: RetreivedTimetableBlocks[]; }) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [width, setWidth] = useState(1200);
  const router = useRouter();
  
  const handleDeleteBlock = async (id: string) => {
    if (!confirm("Delete this block?")) return;
    await deleteBlock(id);
    router.refresh();
  }

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
    <div className="max-h-full">
      <div className="w-full flex grow mb-1">
        <div className="flex grow justify-end">
          <Button
            onClick={() => setDeleteMode(d => !d)}
            className={`
              px-3 py-1 text-sm font-medium
              ${deleteMode
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"}
            `}
          >
            <LucideEdit2 /> <span className="hidden sm:flex">{deleteMode ? "Stop Editing" : "Edit"}</span>
          </Button>
        </div>
      </div>
      
      <div className="max-h-100 xl:max-h-175 overflow-auto border border-slate-700">
        <div
          className="grid grid-cols-[60px_repeat(7,1fr)] min-w-[700px]"
          style={{
            gridTemplateRows: `40px repeat(${virtualRows}, 8px)`,
          }}
        >
          {/* ===== Header ===== */}
          {labels.map((label, i) => (
            <div
              key={`h-${i}`}
              className={`
                sticky top-0 z-12
                flex items-center justify-center
                border border-slate-700
                bg-slate-800 text-white font-semibold text-sm
                ${i==0 ? "z-13 left-0":""}
            `}
              style={{ gridColumn: i + 1, gridRow: 1 }}
            >
              {label}
            </div>
          ))}

          {/* ===== Time Column ===== */}
          {Array.from({ length: virtualRows }).map((_, i) => {
            const showLabel = i % visibleSlotInterval === 0;
            const totalMinutes = i * minSlotMinutes;
            const hour = startHour + Math.floor(totalMinutes / 60);
            const minute = totalMinutes % 60;
            const label = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
            return (
              <div
                key={`t-${i}`}
                className={`
                  sticky left-0 z-10 bg-slate-900 h-3 w-full flex items-center justify-end
                  text-xs text-slate-400 pr-1 text-right
                  ${showLabel ? "border-t overflow-visible z-11 h-3 border-slate-700" : ""}
                  border-r border-l border-slate-700
                `}
                style={{ gridColumn: 1, gridRow: i + 2 }}
              >
                {showLabel ? (
                  minute === 0 ? <span className="font-bold">{label}</span> : label
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            );
          })}

          {/* ===== Events ===== */}
          {(events ?? []).filter(Boolean).map(e => {
            const start = Math.max(0, timeToRow(e.start_time));
            const end = Math.min(virtualRows, timeToRow(e.end_time));
            if (end <= 0 || start >= virtualRows) return null;
            return (
              <div
                key={e.id}
                className="
                  rounded-lg border-blue-800 border bg-blue-600 text-white text-xs
                  px-1 py-0.5 m-[1px]
                  overflow-hidden
                  flex flex-col h-full
                "
                style={{
                  gridColumn: +e.day_of_week + 1,
                  gridRow: `${start + 2} / ${end + 2}`,
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-row flex grow items-start">
                    <div className="justify-start flex grow p-0.5">
                    {e.start_time.slice(0, 5)}
                    </div>
                    <div className="flex grow justify-end p-0.5">
                      {deleteMode && (
                        <LucideX className="size-4 text-gray-300 hover:text-white cursor-pointer" onClick={() => handleDeleteBlock(e.id)} />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center font-bold">
                    {e.subject}
                  </div>
                  <div className="flex-row flex grow items-end">
                  
                  <div className="flex grow justify-start p-0.5">
                    {e.end_time.slice(0, 5)}
                    </div>
                    <div className="flex grow justify-end p-0.5">
                    {e.location}
                  </div>
                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
