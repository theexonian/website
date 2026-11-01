# Issues

List of issues present (that may present future fixes/headaches)

## Back End: Double records due to Strapi + Postgres integration

[Strapi Issue #21393](https://github.com/strapi/strapi/issues/21393)

## Front End: NextJS 15 + React 19 Blocked

Many front end components depend on React 18, so updating to NextJS 15 (which requires React 19) doesn't work for now.

## Search: Meilisearch index exposes full author records

**Fixed in code, needs a reindex.** `src/app/search/page.tsx` queries Meilisearch directly from the
browser with a search-only API key, so whatever is in the index is readable by anyone.

`backend/config/plugins.ts` now:

- filters members-only sections out of the index (`filterEntry`), so Op-Ed and Humor text cannot be
  retrieved anonymously;
- rewrites each author to `{ displayName, slug }` where `displayName` is already shortened
  (`transformEntry`);
- restricts `displayedAttributes` to the fields the search UI uses, so `content`, `email`, password
  hashes and tokens are not returned even if the transform regresses.

Still required, on the server:

1. Confirm the live index name. `/search` queries `article`; the old config block was keyed
   `articles` with `indexName: 'my_articles'` and was likely inert. The config now relies on the
   default index name (`article`).
2. Reindex, because existing documents still contain the old shape. Delete any orphaned `my_articles`
   index.
3. Set the search-only key to allow only `article`, and confirm
   `GET /indexes/article/settings/displayed-attributes` matches the code.

