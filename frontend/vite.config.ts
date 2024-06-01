/** @type {import('vite').UserConfig} */
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import process from "process";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: { port: 3000 },
    plugins: [react()],
    base: env.BASE_URL || "/StratHub",
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "#root": resolve(__dirname),
      },
    },
    define: {
      __BASE_URL__: JSON.stringify(env.BASE_URL || "/StratHub"),
      __BACKEND_URL__: JSON.stringify(
        env.BACKEND_URL || "http://localhost:5000"
      ),
    },
  };
});
