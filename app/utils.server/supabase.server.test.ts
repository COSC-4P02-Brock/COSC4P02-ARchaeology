const TEST_URL = "https://not-so-secret-subdomain.supabase.co";
const TEST_KEY = "not-so-secret-key";

describe("supabase", () => {
  // Cache the original values of the environment variables so we can restore
  // them after the tests run.
  const originalSupabaseUrl = process.env.SUPABASE_URL;
  const originalSupabaseKey = process.env.SUPABASE_KEY;

  afterAll(() => {
    // Restore the original values of the environment variables.
    process.env.SUPABASE_URL = originalSupabaseUrl;
    process.env.SUPABASE_KEY = originalSupabaseKey;
    
    // Reset the module registry so the next time the supabase module is
    // is imported, it will be re-evaluated and the environment variables
    // will be read again with their original values.
    vi.resetModules();
  });

  beforeEach(() => {
    // Reset the module registry so the next time the supabase module is
    // imported, it will be re-evaluated and the environment variables will
    // be read again with the values set in the test.
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
