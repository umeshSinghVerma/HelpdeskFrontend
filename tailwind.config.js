// tailwind.config.js
module.exports = {
    purge: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    content: [
      'node_modules/preline/dist/*.js',
    ],
    theme: {
      extend: {
        colors: {
          programmiz: "#f9fafc",
        },
      },
    },
    darkMode: "class",
    plugins: [
      require("tw-elements/dist/plugin.cjs"),
      require("tailwind-scrollbar"),
      require('preline/plugin'),
    ],
  };
  