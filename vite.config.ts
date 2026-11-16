import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { fileURLToPath, URL } from "node:url";

// Un seul fichier HTML en sortie : c'est ce que l'artefact publié attend
// (icônes à côté, dans ./icons/).
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: { target: "es2022" },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
  },
});
