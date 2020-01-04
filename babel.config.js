module.exports = api => {
  api.cache(true);
  return {
    presets: [
      [
        require("@babel/preset-env"),
        {
          targets: { electron: require("electron/package.json").version }
        }
      ]
    ],
    plugins: [require("@babel/plugin-syntax-dynamic-import")]
  };
};
