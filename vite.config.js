import { defineConfig } from "vite";

export default defineConfig({
  base: "/sandbox/",
  server: {
    port: Number(process.env.PORT) || 5173,
  },
});
