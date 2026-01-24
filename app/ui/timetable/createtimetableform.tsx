import { createNewTimetableSet } from "@/lib/actions";



export default function CreateTimetable() {
    const formAction = createNewTimetableSet;

    return (
        <form action={formAction} className="flex mb-4 flex-col gap-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg max-w-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Create New Timetable</h2>
            <div className="flex flex-col">
                <label htmlFor="title" className="mb-1 font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input type="text" id="title" name="title" required className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="description" className="mb-1 font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea id="description" name="description" className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"></textarea>
            </div>
            <button type="submit" className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Create Timetable</button>
        </form>
    )
}