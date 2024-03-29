module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          alias: {
            "~components": "./components",
            "~assets": "./assets",
            "~images": "./assets/images",
            "~redux": "./appRedux",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
