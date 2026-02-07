import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import { apiRouter } from "./routes";
import { errorHandler, notFound } from "./middleware/error";
import { env } from "./config/env";

export const createApp = () => {
  const app = express();

  const corsOrigins =
    env.CORS_ORIGINS === "*"
      ? "*"
      : env.CORS_ORIGINS.split(",").map(origin => origin.trim());

  app.use(helmet());
  app.use(
    cors({
      origin: corsOrigins,
      credentials: true
    })
  );
  app.use(express.json());
  app.use(
    pinoHttp({
      level: env.LOG_LEVEL
    })
  );

  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 120
  });
  app.use(limiter);

  app.get("/", (_req, res) => {
    res.json({ name: "Parikshe API", status: "ok" });
  });

  app.use("/api", apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
