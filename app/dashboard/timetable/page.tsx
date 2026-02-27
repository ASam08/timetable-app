import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideGrid2X2Plus, PlusCircle } from "lucide-react";
import TimetableGridServer from "@/app/ui/timetable/timetablegridserver";
import { getTimetableSets, getUserID } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function timetablePage() {
  const user_id = await getUserID();
  console.log("USER ID:", user_id);
  const set_id = user_id ? await getTimetableSets(user_id) : null;
  console.log("TIMETABLE SET ID:", set_id);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
        Timetable
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex-rows flex">
          <div className="flex grow">
            <Link href="./timetable/new-timetable">
              <Button className="bg-blue-600 text-white">
                <LucideGrid2X2Plus />
                Create New Timetable
              </Button>
            </Link>
          </div>
          {set_id && (
            <div className="flex grow justify-end">
              <Link href="\dashboard\timetable\add-block">
                <Button className="hidden bg-blue-600 text-white sm:flex">
                  <PlusCircle /> Add Timetable Block
                </Button>
                <Button className="flex bg-blue-600 text-white sm:hidden">
                  <PlusCircle />
                </Button>
              </Link>
            </div>
          )}
        </div>

        <TimetableGridServer />
      </div>
    </div>
  );
}
