import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8081", // Asegúrate de que la URL sea correcta
    setupNodeEvents(on, config) {
      // Agrega aquí la configuración de eventos si es necesario
    },
  },
});