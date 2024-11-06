const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '52fzaw',
  e2e: {
    baseUrl: 'http://localhost:8081',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
