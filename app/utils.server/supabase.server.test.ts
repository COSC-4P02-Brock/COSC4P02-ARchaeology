const TEST_URL = "https://not-so-secret-subdomain.supabase.co";
const TEST_KEY = "not-so-secret-key";

describe("supabase", () => {
  const originalSupabaseUrl = process.env.SUPABASE_URL;
  const originalSupabaseKey = process.env.SUPABASE_KEY;

  afterAll(() => {
    process.env.SUPABASE_URL = originalSupabaseUrl;
    process.env.SUPABASE_KEY = originalSupabaseKey;

    vi.resetModules();
  });

  beforeEach(() => {
    vi.resetModules();
  });

  test("throws an error if SUPABASE_URL env var is not set", async () => {
    process.env.SUPABASE_URL = "";
    process.env.SUPABASE_KEY = TEST_KEY;

    await expect(import("./supabase.server")).rejects.toThrowError();
  });

  test("throws an error if SUPABASE_KEY env var is not set", async () => {
    process.env.SUPABASE_URL = TEST_URL;
    process.env.SUPABASE_KEY = "";

    await expect(import("./supabase.server")).rejects.toThrowError();
  });

  test("imports supabase", async () => {
    process.env.SUPABASE_URL = TEST_URL;
    process.env.SUPABASE_KEY = TEST_KEY;

    const { supabase } = await import("./supabase.server");
    expect(supabase).toBeDefined();
  });
});
