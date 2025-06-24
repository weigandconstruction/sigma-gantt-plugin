import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

export default defineConfig({
  root: ".",
  build: {
    outDir: "build", // Output build files to the build directory
    emptyOutDir: true, // Clean build directory before build
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
  server: {
    https: {
      key: fs.readFileSync(resolve(__dirname, "key.pem")),
      cert: fs.readFileSync(resolve(__dirname, "cert.pem")),
    },
    cors: true, // Enable CORS for development server
    port: 5173, // Set the port for the development server
  },
});
