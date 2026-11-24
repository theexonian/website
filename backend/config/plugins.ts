// Mirrors frontend/src/lib/bylines.ts. Search is proxied through the front end
// (src/app/api/search/route.ts) with a server-only key, but the index is still
// transformed so a leaked key cannot expose full author records.
const shortenName = (fullname?: string) => {
  const parts = (fullname ?? '').trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return parts[0] ?? '';
  return `${parts[0][0]}. ${parts[parts.length - 1]}`;
};

module.exports = ({ env }) => ({
  meilisearch: {
    config: {
      // Key is the content-type name (`api::article.article`). The index name is
      // left at its default, `article`, which is what /search queries.
      article: {
        // Every section is indexed. /search is members-only and reaches
        // Meilisearch through a server-side proxy, so members-only sections are
        // no longer filtered out here.
        transformEntry({ entry }) {
          const { authors, ...rest } = entry;
          return {
            ...rest,
            authors: (authors ?? []).map(({ fullname, slug }) => ({
              displayName: shortenName(fullname),
              slug,
            })),
          };
        },
        settings: {
          // Defence in depth: even a future transform regression cannot expose
          // fields that are not displayed.
          displayedAttributes: [
            'id',
            'title',
            'description',
            'slug',
            'tag',
            'authors',
            'createdAt',
          ],
        },
        entriesQuery: { populate: ['authors'] },
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
          },
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET'),
            ACL: env('AWS_ACL', 'public-read'),
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
          },
        },
        baseUrl: env('AWS_CLOUDFRONT_URL'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  'config-sync': {
    enabled: true,
  },
});
