import { createNewTimetableSet } from "@/lib/actions";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const initialState = {};
export default function CreateTimetable() {
  const [state, formAction] = useActionState(
    createNewTimetableSet,
    initialState,
  );

  return (
    <form action={formAction}>
      <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
        Create A New Timetable
      </h1>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Enter a title for your timetable"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Add a description"
          ></Textarea>
        </div>
      </div>
      <div className="flex flex-row gap-4 py-4">
        <Link href="/dashboard/timetable">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}
