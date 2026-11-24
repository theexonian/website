# APIs

APIs used in the website:

## Front End `.env`

- **`NEXT_PUBLIC_*`** values are inlined into the browser bundle at build time. They are public. Changing one requires a rebuild (on Vercel: a redeploy) because the old value is baked into the shipped JS.
- **Everything else** is server-only and must stay that way.

```sh
# Server-only. Never add this to the `env` block of next.config.js: that inlines
# the value into client bundles. Rotate in Strapi admin > Settings > API Tokens.
STRAPI_API=INSERT_KEY

# Public by design: the Meilisearch host is not a secret.
NEXT_PUBLIC_MEILISEARCH_URL=https://meilisearch.theexonian.net

# Server-only. The index contains members-only sections, so this key must never reach the browser. /search queries Meilisearch through src/app/api/search/route.ts,which is gated by Clerk. This is a search-only key scoped to the `article` index.
MEILISEARCH_SEARCH_KEY=INSERT_KEY

# Server-only, read by src/app/api/speechify/route.ts.
SPEECHIFY_API_KEY=INSERT_KEY
```

Strapi is never called from the browser: access goes through `src/lib/fetchRequests.ts` and `src/actions/*`. Do not import those modules from a `"use client"` component, and do not mark an action `"use server"` — that turns it into a publicly callable endpoint returning unredacted Strapi data.

`STRAPI_API` should be a read-only Strapi token scoped to the content types the front end reads. The write token used by the import scripts lives only in `backend/.env` as `STRAPI_API_UPLOAD`.

## Access control

The site is members-only by default; the public surface is listed in `src/proxy.ts`
(`isPublicRoute`). Anything not listed redirects to sign-in.

- **Identity source:** a Clerk session, created through Microsoft SSO restricted to `exeter.edu` by
  the Clerk dashboard. That restriction is **not in this repository** — if the dashboard config is
  loosened, the app treats the new account as a full member.
- **`src/lib/viewer.ts` is the only module that reads auth state.** Everything else receives a
  `Viewer`.
- **Bylines are redacted in the actions**, before `toBylines` output leaves the server. Anonymous
  viewers get first initial + last name and no author slug, so no `/writers/...` link can leak a name.
  Never pass a raw author record to a client component; once a name is in props it is in the payload.
- **Sections:** `news`, `life`, `sports` are public (`src/lib/access.ts`); `oped` and `humor` are
  members-only. The `[tag]` pages are gated in middleware; `/articles/[slug]` is gated in the page
  because its section is data, not a route.
- **Caching:** Strapi responses are still cached (`revalidate: 300`), which is safe because every page
  that renders per-viewer content calls `auth()` and is therefore rendered dynamically. Do not add a
  static `revalidate` export to those pages.
- **Search:** `/search` is members-only and the index contains every section, including `oped` and
  `humor`. Meilisearch is therefore **never** queried from the browser: `src/app/search/page.tsx`
  passes a custom `httpClient` to `instantMeiliSearch` that posts to `src/app/api/search/route.ts`,
  which checks the Clerk session and forwards to Meilisearch with the server-only
  `MEILISEARCH_SEARCH_KEY`. The proxy only allows `multi-search`, `indexes/*/search` and
  `indexes/*/facet-search`. `backend/config/plugins.ts` still rewrites each author to
  `{ displayName, slug }` and restricts `displayedAttributes`, so a leaked key cannot expose full
  author records.

`BYPASS_AUTH=true` disables the middleware gate for local work. It is server-only and has no effect on
Vercel.

## Back End `.env`

```sh
Note that the *meilisearch URL and master key* are entered inside the Strapi portal.
```

```sh
HOST=0.0.0.0
PORT=1337
APP_KEYS=INSERT_APP_KEYS
API_TOKEN_SALT=INSERT_TOKEN
ADMIN_JWT_SECRET=INSERT_TOKEN
TRANSFER_TOKEN_SALT=INSERT_TOKEN

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=INSERT_RDS.rds.amazonaws.com
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=INSRET_USERNAME
DATABASE_PASSWORD=INSERT_PASSWORD
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
JWT_SECRET=INSERT_SECRET
```
