export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env(
    'PUBLIC_URL',
    env('NODE_ENV') === 'production' ? 'https://server.theexonian.net' : 'http://localhost:1337'
  ),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
