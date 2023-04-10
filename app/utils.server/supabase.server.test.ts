describe("subabase", () => {
  let originalSupbaseUrl = process.env.SUPABASE_URL;
  let originalSupbaseKey = process.env.SUPABASE_KEY;

  afterAll(() => {
    process.env.SUPABASE_URL = originalSupbaseUrl;
    process.env.SUPABASE_KEY = originalSupbaseKey;

    vi.resetModules();
  });

  beforeEach(() => {
    vi.resetModules();
  });

  test("throws an error if SUPABASE_URL env var is not set", async () => {
    process.env.SUPABASE_URL = "";
    process.env.SUPABASE_KEY = "notsosecretkey";

    await expect(import("./supabase.server")).rejects.toThrowError();
  });

  test("throws an error if SUPABASE_KEY env var is not set", async () => {
    process.env.SUPABASE_URL = "https://notsosecretsubdomain.supabase.co";
    process.env.SUPABASE_KEY = "";

    await expect(import("./supabase.server")).rejects.toThrowError();
  });

  test("imports supabase", async () => {
    process.env.SUPABASE_URL = "https://notsosecretsubdomain.supabase.co";
    process.env.SUPABASE_KEY = "notsosecretkey";

    const { supabase } = await import("./supabase.server");
    expect(supabase).toBeDefined();
  });
});
