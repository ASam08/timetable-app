import AddTimetableBlock from "@/app/ui/timetable/addtimetableblock";
import { getUserID, getTimetableSets } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function addBlockPage() {
    const user_id = await getUserID();
    const sets = user_id ? await getTimetableSets(user_id) : null;

    if (!Array.isArray(sets) || sets.length === 0 || !user_id) {
        redirect("/dashboard/timetable");
    }
    
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 max-w-2xl">
            <AddTimetableBlock />
        </div>
        
    )
}