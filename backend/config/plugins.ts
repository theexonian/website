module.exports = ({ env }) => ({
  meilisearch: {
    config: {
      articles: {
        indexName: 'my_articles',
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
        },
        params: {
          Bucket: env('AWS_BUCKET'),
          ACL: env('AWS_ACL', 'public-read'),
          signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
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
