'use server';

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!);

const user_id = "123e4567-e89b-12d3-a456-426614174000"; // Placeholder for the authenticated user's ID

const TimetableSetSchema = z.object({
    id: z.string(),
    owner_id: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

const createTimetableSet = TimetableSetSchema.omit({ id: true });

export async function createNewTimetableSet(formData: FormData) {
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
            VALUES (${owner_id}, ${title}, ${description})
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