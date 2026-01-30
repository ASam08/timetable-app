"use server";

import postgres from "postgres";
import { RetreivedTimetableBlocks } from "./definitions";
import LocalDateDisplay from "@/components/ui/dashboard/localdate";
import LocalTimeDisplay from "@/components/ui/dashboard/localtime";

const sql = postgres(process.env.POSTGRES_URL!);

const user_id = "123e4567-e89b-12d3-a456-426614174000"; //TODO: Placeholder for the authenticated user's ID

export async function testConnection() {
  try {
    const data = await sql`SELECT version()`;
    console.log("Database connection successful:", data);
    return data;
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

export async function getTimetableSets(user_id:string) {
  try {
    const result = await sql`
      SELECT id FROM timetable_sets
      WHERE owner_id = ${user_id}
      LIMIT 1
    `;
    return result[0];
  } catch (error) {
    console.error("Error fetching timetable sets:", error);
    return null;
  }
}

export async function getTimetableBlocks(timetable_set_id:string) {
  try {
    const blocks = await sql<RetreivedTimetableBlocks[]>`
    SELECT id, start_time, end_time, day_of_week, subject, location FROM timetable_blocks
    WHERE timetable_set_id = ${timetable_set_id}
    `;
    return blocks;
  } catch (error) {
    console.error("Error fetching timetable blocks:", error);
  }
}

export async function getCurrentBlock(timetable_set_id: string, dayOfWeekNumber: number, time: string) {
  try {
    const current = await sql<RetreivedTimetableBlocks[]>`
    SELECT id, start_time, end_time, day_of_week, subject, location FROM timetable_blocks
    WHERE timetable_set_id = ${timetable_set_id} AND day_of_week = ${dayOfWeekNumber} AND start_time <= ${time} AND end_time > ${time}
    LIMIT 1
    `;
    console.log(current)
    return current[0] ?? null
  } catch (error) {
    console.log("Error fetching timetable block:", error);
    return null;
  }
}