import { getTimetableBlocks, getTimetableSets } from "@/lib/data";
import { TimetableGrid } from "./newtimetable";

export default async function TimetableGridServer() {
  const user_id = "123e4567-e89b-12d3-a456-426614174000"; // TODO: auth
  const setId = await getTimetableSets(user_id)
  const events = await getTimetableBlocks(setId[0].id);
  return <TimetableGrid events={events ?? []} />;
}
