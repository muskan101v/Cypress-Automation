const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  retries: {
    runMode: 1,
  },
  env: {
    url: "https://rahulshettyacademy.com",
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      // return require("./cypress/plugins/index.js")(on, config);
      // implement node event listeners here
    },
    // specPattern: "cypress/integration/examples/*.js",
    specPattern: "cypress/integration/examples/BDD/*.feature",
  },
});
