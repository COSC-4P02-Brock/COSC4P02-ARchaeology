import { supabase } from "./supabase.server";

const TEST_URL = "https://not-so-secret-subdomain.supabase.co";
const TEST_KEY = "not-so-secret-key";

describe("supabase", () => {
  test("creates supabase client", () => {
    const client = supabase({ SUPABASE_URL: TEST_URL, SUPABASE_KEY: TEST_KEY });
    expect(client).toBeDefined();
  });
});
