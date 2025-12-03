import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    allowedHosts: ["fairy-benzoic-carmen.ngrok-free.dev"],
  },
  // ✅ Optimization: ensures MUI ESM builds are pre-bundled correctly
  optimizeDeps: {
    include: ["@mui/x-data-grid"],
  },
  ssr: {
    // Prevent `@mui/x-data-grid` from being externalized in SSR
    noExternal: ["@mui/x-data-grid"],
  },
});
