import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9081,
    proxy: {
      "/v1": {
        target: "https://service-brown-xi.vercel.app/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [
      // https://github.com/vitejs/vite/issues/2185
      { find: /^~/, replacement: "" },
      { find: "@", replacement: resolve(__dirname, "src") },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: false,
      },
    },
  },
});
