"use server";

import postgres from "postgres";

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

export async function getTimetableSets() {
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