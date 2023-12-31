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
      "@services": resolveRelativePath("./src/shared/services/"),
      "@decorators": resolveRelativePath("./src/shared/decorators/"),
      "@utils": resolveRelativePath("./src/shared/utils/"),
      "@controllers": resolveRelativePath("./src/controllers/"),
    },
  },
});
