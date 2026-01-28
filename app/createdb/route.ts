import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!);

async function createUserTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return { message: "Table created" };
}

async function createTimetableSetTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
        CREATE TABLE IF NOT EXISTS timetable_sets (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            owner_id UUID NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return { message: "Table created" };
}

async function createTimetableBlockTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
        CREATE TABLE IF NOT EXISTS timetable_blocks (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            timetable_set_id UUID NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            day_of_week VARCHAR(10) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    return { message: "Table created" };
}

// async function createTimetableEntryTable() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await sql`
//         CREATE TABLE IF NOT EXISTS timetable_entries (
//             id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//             timetable_set_id UUID NOT NULL,
//             timetable_block_id UUID NOT NULL,
//             subject VARCHAR(255) NOT NULL,
//             location VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//     `;
//     return { message: "Table created" };
// }

async function createUserTimetableSetsTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
        CREATE TABLE IF NOT EXISTS user_timetable_sets (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,    
            user_id UUID NOT NULL,
            timetable_set_id UUID NOT NULL
        );
    `;
    return { message: "Table created" };
}

export async function GET() {
  try {
    await createUserTable();
    await createTimetableSetTable();
    await createTimetableBlockTable();
    await createTimetableEntryTable();
    await createUserTimetableSetsTable();
    return Response.json({ message: "Database tables created successfully." });
  } catch (error) {
    console.error("Error creating database tables:", error);
    return Response.json({ message: "Error creating database tables.", error });
  }
}
