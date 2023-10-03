import { defineConfig } from "vite";
import { resolve } from "path";

const resolveRelativePath = (relativePath: string): string => resolve(__dirname, relativePath);

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ["module", "jsnext:main", "jsnext"],
    alias: {
      "@models": resolveRelativePath("./src/shared/models/"),
      "@interfaces": resolveRelativePath("./src/shared/interfaces/"),
      "@decorators": resolveRelativePath("./src/shared/decorators/"),
      "@controllers": resolveRelativePath("./src/controllers/"),
    },
  },
});
