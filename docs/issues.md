# Issues

List of issues present (that may present future fixes/headaches)

## Back End: Double records due to Strapi + Postgres integration

[Strapi Issue #21393](https://github.com/strapi/strapi/issues/21393)

## Front End: NextJS 15 + React 19 Blocked

Many front end components depend on React 18, so updating to NextJS 15 (which requires React 19) doesn't work for now.

## Search: Meilisearch index exposes full author records

`src/app/search/page.tsx` queries Meilisearch directly from the browser using a search-only API key (`NEXT_PUBLIC_MEILISEARCH_PK`). Every hit in the `article` index embeds complete Strapi user documents under `authors`, including `email`, `password` (bcrypt hash), `resetPasswordToken`, `confirmationToken`, `provider` and `blocked`.

The key cannot list indexes or manage keys, so the blast radius is limited to author records - but that already defeats any author-name redaction applied in the Next.js layer, and it puts password hashes in front of anonymous visitors.

Direction of fix: restrict what the index can return with `displayedAttributes` (only safe fields such as `authors.displayName` and `authors.slug`), rebuild the index without user secrets, and stop the Meilisearch plugin from embedding full user documents in the `authors` relation.
