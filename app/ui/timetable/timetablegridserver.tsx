import { getTimetableBlocks, getTimetableSets, getUserID } from "@/lib/data";
import { TimetableGrid } from "./newtimetable";

export default async function TimetableGridServer() {
  const user_id = await getUserID();
  if (!user_id) return (
    <div className="" >
      You haven't created a timetable yet
    </div>
  )
  const setId = await getTimetableSets(user_id);
  if (!setId || setId.length === 0) return (
    <div className="" >
      You haven't created a timetable yet
    </div>
  )
  const events = await getTimetableBlocks(setId[0].id);
  return <TimetableGrid events={events ?? []} />;
}
