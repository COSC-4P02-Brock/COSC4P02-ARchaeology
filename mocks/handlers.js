// Note: we may be unable to mock requests at this time.
//
// From https://codesandbox.io/s/github/remix-run/examples/tree/main/msw?file=/README.md:1090-1606 :
// 
// MSW currently does not support intercepting requests made by [undici](https://undici.nodejs.org/#/).
// For local development, Cloudflare Workers and Pages simulates the production
// environment using [wrangler](https://developers.cloudflare.com/workers/cli-wrangler),
// which runs [miniflare](https://github.com/cloudflare/miniflare) internally. 
// `Miniflare` implements `fetch` using `undici` instead of `node-fetch`.
// You can follow this issue [#159](https://github.com/mswjs/interceptors/issues/159) to track the progress.

const { rest } = require("msw");

const SUPABASE_URL = "https://zqcwjedadrenysntjtzo.supabase.co";

const handlers = [
  rest.get(`${SUPABASE_URL}/rest/v1/artifacts`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: "Musket",
        },
      ])
    );
  }),
];

module.exports = { handlers };
