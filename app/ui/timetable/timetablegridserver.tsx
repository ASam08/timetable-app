import { getTimetableBlocks, getTimetableSets, getUserID } from "@/lib/data";
import { TimetableGrid } from "./newtimetable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LucideGrid2X2Plus } from "lucide-react";

export default async function TimetableGridServer() {
  const user_id = await getUserID();
  if (!user_id)
    return (
      <div className="items-center">
        You haven't created a timetable yet
        <div className="flex grow">
          <Link href="./timetable/new-timetable">
            <Button className="hidden bg-blue-600 text-white sm:flex">
              <LucideGrid2X2Plus />
              Create New Timetable
            </Button>
            <Button className="flex bg-blue-600 text-white sm:hidden">
              <LucideGrid2X2Plus />
            </Button>
          </Link>
        </div>
      </div>
    );
  const setId = await getTimetableSets(user_id);
  if (!setId || setId.length === 0)
    return (
      <div className="items-justify-center flex flex-col items-center gap-4">
        You haven't created a timetable yet
        <div className="flex grow">
          <Link href="./timetable/new-timetable">
            <Button className="hidden bg-blue-600 text-white sm:flex">
              <LucideGrid2X2Plus />
              Create New Timetable
            </Button>
            <Button className="flex bg-blue-600 text-white sm:hidden">
              <LucideGrid2X2Plus />
            </Button>
          </Link>
        </div>
      </div>
    );
  const events = await getTimetableBlocks(setId[0].id);
  return <TimetableGrid events={events ?? []} />;
}
