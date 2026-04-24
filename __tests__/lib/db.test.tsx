jest.mock("drizzle-orm/node-postgres", () => ({
  drizzle: jest.fn().mockReturnValue({ mockDb: true }),
}));

describe("Database Connection", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  it("constructs DATABASE_URL from environment variables", async () => {
    process.env.POSTGRES_USER = "testuser";
    process.env.POSTGRES_PASSWORD = "testpass";
    process.env.POSTGRES_HOST = "localhost";
    process.env.POSTGRES_PORT = "5432";
    process.env.POSTGRES_DB = "testdb";

    const { DATABASE_URL } = await import("@/lib/db");

    expect(DATABASE_URL).toBe(
      "postgres://testuser:testpass@localhost:5432/testdb",
    );
  });

  it("falls back to defaults when env vars are not set", async () => {
    delete process.env.POSTGRES_HOST;
    delete process.env.POSTGRES_PORT;
    delete process.env.POSTGRES_USER;
    delete process.env.POSTGRES_PASSWORD;
    delete process.env.POSTGRES_DB;

    const { DATABASE_URL } = await import("@/lib/db");

    expect(DATABASE_URL).toBe("postgres://tempus:tempus@db:5432/tempus");
  });

  it("throws when POSTGRES_USER is empty", async () => {
    process.env.POSTGRES_USER = "";
    process.env.POSTGRES_PASSWORD = "testpass";

    await expect(import("@/lib/db")).rejects.toThrow(
      "Missing database configuration. Set POSTGRES_USER/POSTGRES_PASSWORD.",
    );
  });

  it("throws when POSTGRES_PASSWORD is empty", async () => {
    process.env.POSTGRES_USER = "testuser";
    process.env.POSTGRES_PASSWORD = "";

    await expect(import("@/lib/db")).rejects.toThrow(
      "Missing database configuration. Set POSTGRES_USER/POSTGRES_PASSWORD.",
    );
  });

  it("calls drizzle with the constructed DATABASE_URL", async () => {
    process.env.POSTGRES_USER = "testuser";
    process.env.POSTGRES_PASSWORD = "testpass";
    process.env.POSTGRES_DB = "tempus";
    process.env.POSTGRES_HOST = "db";
    process.env.POSTGRES_PORT = "5432";

    await import("@/lib/db");

    const { drizzle } = require("drizzle-orm/node-postgres");

    expect(drizzle).toHaveBeenCalledWith(
      "postgres://testuser:testpass@db:5432/tempus",
    );
  });
});
