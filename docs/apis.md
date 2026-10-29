# APIs

APIs used in the website:

## Front End `.env`

- **`NEXT_PUBLIC_*`** values are inlined into the browser bundle at build time. They are public. Changing one requires a rebuild (on Vercel: a redeploy) because the old value is baked into the shipped JS.
- **Everything else** is server-only and must stay that way.

```sh
# Server-only. Never add this to the `env` block of next.config.js: that inlines
# the value into client bundles. Rotate in Strapi admin > Settings > API Tokens.
STRAPI_API=INSERT_KEY

# Public by design (browser-side search). Use a search-only key.
NEXT_PUBLIC_MEILISEARCH_URL=https://meilisearch.theexonian.net
NEXT_PUBLIC_MEILISEARCH_PK=INSERT_KEY

# Server-only, read by src/app/api/speechify/route.ts.
SPEECHIFY_API_KEY=INSERT_KEY
```

Strapi is never called from the browser: access goes through `src/lib/fetchRequests.ts` and `src/actions/*`. Do not import those modules from a `"use client"` component, and do not mark an action `"use server"` — that turns it into a publicly callable endpoint returning unredacted Strapi data.

`STRAPI_API` should be a read-only Strapi token scoped to the content types the front end reads. The write token used by the import scripts lives only in `backend/.env` as `STRAPI_API_UPLOAD`.

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
