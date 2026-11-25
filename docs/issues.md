# Issues

List of issues present (that may present future fixes/headaches)

## Back End: Patched Meilisearch plugin (partial reindex)

_This section is written by an agent_

`strapi-plugin-meilisearch` paginates the content types it indexes through
`actionInBatches`. The upstream loop has two defects:

- it stops as soon as a batch returns fewer rows than `batchSize` (500), with no
  error and no log, so a short page silently ends the reindex; and
- it advances by `batchSize` rather than by the number of rows actually
  returned, so a short page would skip rows even if the loop continued.

This surfaced as the admin panel reporting `8359 / 8945` documents with
`INDEXING: No` — the exact arithmetic of 16 full batches of 500 plus a short
page of 359. Everything newer than 2026-02-19 was missing from `/search`.

`patches/strapi-plugin-meilisearch+0.16.5.patch` (applied by `postinstall`)
advances by `entries.length` and drops the short-page early exit, so the loop
only terminates on a genuinely empty page. It also logs each batch size so a
future short page is visible in the Strapi log.

Keep both `dist/server/index.js` (CJS) and `dist/server/index.mjs` (ESM) in the
patch — the package `exports` map serves each to a different consumer.

Relevant upstream reports: [meilisearch/strapi-plugin-meilisearch#384](https://github.com/meilisearch/strapi-plugin-meilisearch/issues/384),
[#296](https://github.com/meilisearch/strapi-plugin-meilisearch/issues/296).

## Back End: Double records due to Strapi + Postgres integration

[Strapi Issue #21393](https://github.com/strapi/strapi/issues/21393)
