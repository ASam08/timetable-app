// TimetableGridServer.tsx (NO "use client")
import { getTimetableBlocks } from "@/lib/data";
import { TimetableGrid } from "./newtimetable";

export default async function TimetableGridServer() {
  const testingSetId = '33aed625-6c60-46f3-9446-d7330bfce1e8' //TODO: Placeholder for testing timetable block creation
    const events = await getTimetableBlocks(testingSetId);
    console.log (events)
  return <TimetableGrid events={events ?? []} />;
}
