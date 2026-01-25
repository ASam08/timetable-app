import ToggleFormVisibility from "@/app/ui/timetable/toggleformvisibility"
import Timetable from "@/app/ui/timetable/timetable"
import AddTimetableBlock from "@/app/ui/timetable/addtimetableblock";

export default function timetablePage() {
    const dow=["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Timetable</h1>
            <ToggleFormVisibility />
            <AddTimetableBlock />
            <Timetable />
        </div> 
    )
}