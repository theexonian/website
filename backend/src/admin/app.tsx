import Logo from "../../favicon.png";

export default {
  config: {
    auth: {
      logo: Logo,
    },
    head: {
      favicon: Logo,
    },
    menu: {
      logo: Logo,
    },
    bootstrap(app) {
      console.log(app);
    },
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },
  translations: {
	en: {
		
	}
  }
};
