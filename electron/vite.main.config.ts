import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ["module", "jsnext:main", "jsnext"],
    alias: {
      "@models": resolve(__dirname, "./src/shared/models/"),
      "@interfaces": resolve(__dirname, "src/shared/interfaces/"),
    },
  },
});
