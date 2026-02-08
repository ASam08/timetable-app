"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import { getTimetableSets, getCurrentBlock, getNextBlock, getUserID } from "@/lib/data";
import { sqlConn } from "@/lib/db";

const sql = sqlConn
const user_id = await getUserID() ?? crypto.randomUUID();

const TimetableSetSchema = z.object({
    id: z.string(),
    owner_id: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().nullable(),
});

const createTimetableSet = TimetableSetSchema.omit({ id: true });

export async function createNewTimetableSet(prevState: any, formData: FormData) {
    const validatedFields = createTimetableSet.safeParse({
        owner_id: user_id,
        title: formData.get("title"),
        description: formData.get("description"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create timetable set.",
        };
    }

    const { owner_id, title, description } = validatedFields.data;

    try {
        await sql`
            INSERT INTO timetable_sets (owner_id, title, description)
            VALUES (${owner_id}, ${title}, ${description ?? null})
        `;
        console.log(`Timetable set ${title} created successfully`);
    } catch (error) {
        console.error("Error creating timetable set:", error);
        return {
            message: "Error creating timetable set.",
            error,
        };
    }

    revalidatePath("/dashboard/timetable");
    redirect("/dashboard/timetable");
}

export type BlockState = {
    errors?: {
        timetable_set_id?: string[];
        day?: number[];
        subject?: string[];
        location?: string[];
        start_time?: string[];
        end_time?: string[];
    };
    message?: string | null;
};

const originalTimetableBlockSchema = z.object({
    id: z.string(),
    timetable_set_id: z.string(),
    day: z.number().int(),
    subject: z.string().min(1, "Subject is required"),
    location: z.string().min(1, "Location is required"),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
});


const createTimetableBlock = originalTimetableBlockSchema
    .omit({ id: true })
    .refine((data) => {
    const startTimeDate = new Date(`1970-01-01T${data.start_time}:00`);
    const endTimeDate = new Date(`1970-01-01T${data.end_time}:00`);

    return endTimeDate > startTimeDate;
}, {
    message: "End time must be after start time",
    path: ["end_time"],
});


export async function addTimetableBlock( prevState: BlockState, formData: FormData) {
    const set_id = await getTimetableSets(user_id);
    if (!set_id || set_id.length === 0) {
        console.warn("No timetable sets found for user", user_id);
        return null; // or empty state
    }
    const validatedFields = createTimetableBlock.safeParse({
        timetable_set_id: /*formData.get("timetable_set_id"),*/ set_id[0].id,
        day: Number(formData.get("day_of_week")),
        subject: formData.get("subject"),
        location: formData.get("location"),
        start_time: formData.get("start_time"),
        end_time: formData.get("end_time"),
    })
    console.log("Validated Fields:", validatedFields);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to add timetable block.",
            consoleLog: console.log(validatedFields.error),
        };
    }
    const { timetable_set_id, day, subject, location, start_time, end_time } = validatedFields.data;

    try {
        await sql`
            INSERT INTO timetable_blocks (timetable_set_id, day_of_week, subject, location, start_time, end_time)
            VALUES (${timetable_set_id}, ${day}, ${subject}, ${location}, ${start_time}, ${end_time})
        `;
        console.log(`Timetable block for ${subject} on ${day} created successfully`);
    } catch (error) {
        console.error("Error creating timetable block:", error);
        return {
            message: "Error creating timetable block.",
            error,
        };
    }
    revalidatePath("/dashboard/timetable");
    redirect("/dashboard/timetable");
}   

export async function fetchCurrentBlock(
  user_id: string,
  dayOfWeek: number,
  time: string
) {
  const sets = await getTimetableSets(user_id);

  // Defensive guard
  if (!Array.isArray(sets) || sets.length === 0) {
    console.warn("No timetable sets found for user:", user_id);
    return null;
  }

  const timetableSetId = sets[0].id;

  return getCurrentBlock(timetableSetId, dayOfWeek, time);
}

export async function fetchNextBlock(
  user_id: string,
  dayOfWeek: number,
  time: string
) {
  const sets = await getTimetableSets(user_id);

  // Defensive guard
  if (!Array.isArray(sets) || sets.length === 0) {
    console.warn("No timetable sets found for user:", user_id);
    return null;
  }

  const timetableSetId = sets[0].id;

  return getNextBlock(timetableSetId, dayOfWeek, time);
}

export async function deleteBlock(id: string) {
    const blockId = id;

    try {
        await sql`
            DELETE FROM timetable_blocks
            WHERE id = ${blockId}
            `;
        console.log("Block %a deleted", blockId);
        revalidatePath('/dashboard/timetable');
    } catch (error) {
        console.error("Block ID not found: ", blockId)
        console.error("Error - ",error)
        return {
            message: "Error deleting block",
            error,
        };
    }
}
