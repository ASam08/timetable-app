import Link from 'next/link';
//import { signOut } from '@/auth'

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-stone-300 dark:bg-gray-900">
            <Link href='/dashboard'>
                <div className="p-4 border-2 rounded-xl border-stone-500 bg-stone-400 dark:bg-gray-800 dark:border-gray-700 mb-4 text-xl font-semibold text-blue-600 dark:text-blue-400">
                    Home
                </div>
            </Link>
            <div className="h-30"></div>
            <Link href='/dashboard/timetable'>
                <div className="p-4 border-2 rounded-xl border-stone-500 bg-stone-400 dark:bg-gray-800 dark:border-gray-700 mb-4 text-xl font-semibold text-blue-600 dark:text-blue-400">
                    Timetable
                </div>
            </Link>
             <Link href='/dashboard/settings'>
                <div className="p-4 border-2 rounded-xl border-stone-500 bg-stone-400 dark:bg-gray-800 dark:border-gray-700 mb-4 text-xl font-semibold text-blue-600 dark:text-blue-400">
                    Settings
                </div>
            </Link>
        </div>
    );
}