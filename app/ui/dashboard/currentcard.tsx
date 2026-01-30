import { getCurrentBlock, getTimetableSets } from "@/lib/data";


export default async function CurrentCard() {

    // const date = getRawLocalDate()
    const day_of_week = 4;
    const time = "16:25:00";

    const testingSetId = '33aed625-6c60-46f3-9446-d7330bfce1e8'; //TODO: Placeholder for testing timetable block creation
    const user_id = "123e4567-e89b-12d3-a456-426614174000"; //TODO: Placeholder for the authenticated user's ID

    const setId = await getTimetableSets(user_id);
    const currentBlock = await getCurrentBlock(setId.id, day_of_week, time);

    if (!currentBlock) {
        return (
        <div className="mt-6 w-1/3 max-w-64 p-4 border-2 border-dashed rounded-lg">
            <p className="text-gray-500">No current block</p>
        </div>
        );
    }

    return (
        <div className="mt-6 w-1/3 max-w-64 p-4 border-2 rounded-lg">
        <p className="text-sm text-gray-500">Current</p>
        <p className="font-bold">{currentBlock.subject}</p>
        <p className="text-sm">{currentBlock.location}</p>
        <p className="text-sm">Finishes at {currentBlock.end_time.slice(0,5)}</p>
        </div>
  );
}