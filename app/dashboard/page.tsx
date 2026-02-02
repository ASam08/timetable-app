import LocalDateDisplay from "@/components/ui/dashboard/localdate";
import LocalTimeDisplay from "@/components/ui/dashboard/localtime";
import CurrentCardClient from "@/app/ui/dashboard/currentcardclient";
import VersionTest from "../ui/dashboard/versiontest";
import NextCardClient from "../ui/dashboard/nextcardclient";

export default function DashboardPage() {
    
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Dashboard</h1>
            <div className="flex">
                <div className="flex-none basis-3/4 self-end text-gray-600 dark:text-gray-400">Welcome to your dashboard! Here you can manage your timetable and settings.</div>
                <div className="flex-3 basis-1/4 text-right"><LocalDateDisplay/><br/><LocalTimeDisplay/></div>
            </div>
            <div className="flex flex-column md:flex-row gap-4">
                <CurrentCardClient />
                <NextCardClient />
            </div>
            <VersionTest />
        </div>
    );
}