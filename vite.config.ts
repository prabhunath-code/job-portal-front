import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import history from "connect-history-api-fallback";
import { IncomingMessage, ServerResponse } from "http";  // Node.js types
import { Request, Response, NextFunction } from "express"; // Express types

function spaFallbackMiddleware() {
  const fallback = history({
    disableDotRule: true,
    htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
  });

  return (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
    // Cast IncomingMessage and ServerResponse to express Request and Response
    const expressReq = req as Request;
    const expressRes = res as Response;

    // Call the fallback middleware with casted request/response
    fallback(expressReq, expressRes, next);
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
