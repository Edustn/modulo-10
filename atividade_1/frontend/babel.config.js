module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: "./utils/.env", // Caminho RELATIVO à raiz do projeto
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};