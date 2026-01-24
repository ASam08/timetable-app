import ToggleFormVisibility from "@/app/ui/timetable/toggleformvisibility"

export default function timetablePage() {
    const dow=["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Timetable</h1>
            <ToggleFormVisibility />
            <div className="mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                <div className="grid grid-cols-8 gap-4 mt-4">
                    {dow.map((day) => (
                        <div key={day} className="bg-gray-100 dark:bg-gray-800 py-4 px-1 rounded-lg text-center text-gray-700 dark:text-gray-300">
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div> 
    )
}