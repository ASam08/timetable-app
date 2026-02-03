import LocalDateDisplay from "@/components/ui/dashboard/localdate";
import LocalTimeDisplay from "@/components/ui/dashboard/localtime";
import CurrentCardClient from "@/app/ui/dashboard/currentcardclient";
import NextCardClient from "../ui/dashboard/nextcardclient";

export default function DashboardPage() {
    
    return (
        <div className="flex h-full max-w-screen flex-col px-3 py-4 md:px-2">
            <h1 className="flex flex-wrap text-2xl font-bold md:mb-4 text-gray-800 dark:text-gray-200">Dashboard</h1>
            <div className="flex flex-row">
                <div className="flex grow self-start-safe text-gray-600 dark:text-gray-400">Welcome to your dashboard!</div>
                <div className="flex grow flex-col self-end-safe items-end-safe">
                    <div className="flex grow text-right"><LocalDateDisplay /></div>
                    <div className="flex grow text-right"><LocalTimeDisplay /></div>
                </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row gap-2 md:gap-4">
                <CurrentCardClient />
                <NextCardClient />
            </div>
        </div>
    );
}