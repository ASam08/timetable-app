import bcrypt from "bcryptjs";
import { sqlConn } from "@/lib/db";

const sql = sqlConn;

async function addNewUser() {
  const email = process.env.EXAMPLE_EMAIL;
  const password = process.env.EXAMPLE_PASSWORD;
  const name = "Example User";

  const hashedPassword = await bcrypt.hash(password!, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
    console.log("Example user created successfully");
  } catch (error) {
    console.error("Error creating example user:", error);
  }
}

export async function GET() {
  const user = await addNewUser();
  return Response.json({ message: "Example user seeded successfully" });
}
