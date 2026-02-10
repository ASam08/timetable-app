import ToggleFormVisibility from "@/app/ui/timetable/toggleformvisibility"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import TimetableGridServer from "@/app/ui/timetable/timetablegridserver"
import { getTimetableSets, getUserID } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function timetablePage() {
    const user_id = await getUserID();
    const set_id = user_id ? await getTimetableSets(user_id) : null;


    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Timetable</h1>
            <div className="flex flex-rows">
                <div className="flex grow">
                    <ToggleFormVisibility/>
                </div>
                {set_id &&
                <div className="flex grow justify-end">
                    <Link href='\dashboard\timetable\add-block'>
                        <Button className="text-white bg-blue-600 hidden sm:flex">
                            <PlusCircle /> Add Timetable Block
                        </Button>
                        <Button className="text-white bg-blue-600 sm:hidden flex">
                            <PlusCircle />
                        </Button>
                    </Link>
                </div>
                }
            </div>
            
            <TimetableGridServer />
        </div> 
    )
}