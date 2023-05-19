import createExpoWebpackConfigAsync from "@expo/webpack-config";

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.devServer = {
    proxy: {
      "/api": "http://192.168.1.13:3000",
    },
  };
  return config;
};
