export default {
  routes: [
    {
      method: 'GET',
      path: '/newsletter/test',
      handler: 'newsletter.test',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/newsletter/subscribe',
      handler: 'newsletter.subscribe',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
