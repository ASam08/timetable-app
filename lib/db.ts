import postgres from "postgres";

const DB_HOST = process.env.DB_HOST ?? "db";
const DB_PORT = process.env.DB_PORT ?? "5432";
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME ?? "timetable";

if (!DB_USER || !DB_PASSWORD) {
  throw new Error("Missing database environment variables");
}

const DATABASE_URL =
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const sqlConn = postgres(DATABASE_URL, {
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});