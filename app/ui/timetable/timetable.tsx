

export default function Timetable() {
    const dow = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const middow = ["Time", "Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    const shortdow = ["","M","Tu","W","Th","F","Sa","Su"]
    const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);
    return (
        <div className="mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <div className="grid grid-cols-8 divide-dashed divide-x-2 divide-gray-800 dark:divide-gray-300 mt-4">
                {dow.map((day) => (
                    <div key={day} className="hidden lg:grid bg-gray-100 dark:bg-gray-800 py-4 px-1 text-center text-gray-700 dark:text-gray-300">
                        {day}
                    </div>
                ))}
                {shortdow.map((shortday) => (
                    <div key={shortday} className="grid md:hidden bg-gray-100 dark:bg-gray-800 py-4 px-1 text-center text-gray-700 dark:text-gray-300">
                        {shortday}
                    </div>
                ))}
                {middow.map((midday) => (
                    <div key={midday} className="hidden md:max-lg:grid bg-gray-100 dark:bg-gray-800 py-4 px-1 text-center text-gray-700 dark:text-gray-300">
                        {midday}
                    </div>
                ))}
                {hours.map((hour) => (
                    <>
                        <div key={hour} className="py-4 px-1 text-center text-gray-700 dark:text-gray-300">
                            {hour}
                        </div>
                        {dow.slice(1).map((day, idx) => (
                            <div key={`${hour}-${day}`} className="py-4 px-1 text-center" />
                        ))}
                    </>    ))}
            </div>
        </div>
    )
}