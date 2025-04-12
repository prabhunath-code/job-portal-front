
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import  history from "connect-history-api-fallback";
import type { IncomingMessage, ServerResponse } from "http";
import type { NextHandleFunction } from "connect";

function spaFallbackMiddleware(): NextHandleFunction {
  const fallback = history({
    disableDotRule: true,
    htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
  });

  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    fallback(req, res, next);
  };
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "spa-fallback",
      configureServer(server) {
        server.middlewares.use(spaFallbackMiddleware());
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
