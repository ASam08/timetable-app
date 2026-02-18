import { createNewTimetableSet } from "@/lib/actions";
import { useActionState } from "react";

const initialState = {};
export default function CreateTimetable() {
  const [state, formAction] = useActionState(
    createNewTimetableSet,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="mb-4 flex max-w-md flex-col gap-4 rounded-lg border-2 border-dashed border-gray-300 p-4 dark:border-gray-700"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
        Create New Timetable
      </h2>
      <div className="flex flex-col">
        <label
          htmlFor="title"
          className="mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        ></textarea>
      </div>
      <button
        type="submit"
        className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Create Timetable
      </button>
    </form>
  );
}
