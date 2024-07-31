const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },
  env: {
    mobileViewportWidthBreakpoint: 420,
  },
  viewportHeight: 990,
  viewportWidth: 1200,
});