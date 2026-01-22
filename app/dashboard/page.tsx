import LocalDateDisplay from "@/components/ui/dashboard/localdate";
import LocalTimeDisplay from "@/components/ui/dashboard/localtime";
import CurrentCard from "@/app/ui/dashboard/currentcard";
import VersionTest from "../ui/dashboard/versiontest";

export default function DashboardPage() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Dashboard</h1>
            <div className="flex">
                <div className="flex-none basis-3/4 self-end text-gray-600 dark:text-gray-400">Welcome to your dashboard! Here you can manage your timetable and settings.</div>
                <div className="flex-3 basis-1/4 text-right"><LocalDateDisplay/><br/><LocalTimeDisplay/></div>
            </div>
            <div className="mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-500">This is a placeholder for dashboard content.</p>
            </div>
            <div>
                <CurrentCard />
            </div>
            <VersionTest />
        </div>
    );
}