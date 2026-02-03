import { LucideGrid, LucideHome, LucideSettings } from 'lucide-react';
import Link from 'next/link';
//import { signOut } from '@/auth'

export default function SideNav() {
    return (
        <div className="flex md:h-full max-w-screen gap-2 flex-row md:flex-col py-2 md:py-4 px-2 bg-stone-300 dark:bg-gray-900">
            <Link href='/dashboard'
                className="flex flex-row p-2 border-2 rounded-xl border-stone-500 bg-stone-400 dark:bg-gray-800 dark:border-gray-700 mb-4 xl:text-xl font-semibold text-blue-600 dark:text-blue-400">
                <LucideHome /><span className='hidden md:flex md:pl-2'>Home</span>
            </Link>
            <div className="md:h-20 hidden"></div>
            <Link href='/dashboard/timetable'
                className="flex flex-row p-2 border-2 rounded-xl border-stone-500 bg-stone-400 dark:bg-gray-800 dark:border-gray-700 mb-4 xl:text-xl font-semibold text-blue-600 dark:text-blue-400">
                <LucideGrid /><span className='hidden md:flex md:pl-2'>Timetable</span>
            </Link>
            <Link href='/dashboard/settings'
                className="flex flex-row p-2 border-2 rounded-xl border-stone-500 bg-stone-400 dark:bg-gray-800 dark:border-gray-700 mb-4 xl:text-xl font-semibold text-blue-600 dark:text-blue-400">
                <LucideSettings /><span className='hidden md:flex md:pl-2'>Settings</span>
            </Link>
        </div>
    );
}