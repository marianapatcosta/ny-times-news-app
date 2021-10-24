module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/_main.scss";`,
      },
    },
  },

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "NY Times";
      return args;
    });
  },
};
