import { createApp } from "./app";
import { env } from "./config/env";
import { connectRedis } from "./config/redis";

const app = createApp();

const start = async () => {
  try {
    await connectRedis();
  } catch (error) {
    console.error("Redis connection failed:", error);
  }

  app.listen(env.PORT, () => {
    console.log(`Parikshe API running on port ${env.PORT}`);
  });
};

start();
