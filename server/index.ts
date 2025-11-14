import Fastify, { FastifyError } from "fastify";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import { surveyRoutes } from "./routes/survey.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST = process.env.HOST || "0.0.0.0";

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
});

// Register plugins and routes
async function registerPlugins() {
  await server.register(cors, {
    origin: true,
    credentials: true,
  });
  await server.register(surveyRoutes);
}

await registerPlugins();

// Global error handler
server.setErrorHandler((error: FastifyError, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: "Validation Error",
      details: error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    });
  }

  server.log.error(error);

  const statusCode = error.statusCode || 500;

  reply.status(statusCode).send({
    error: error.name || "Internal Server Error",
    message: error.message || "An unexpected error occurred",
  });
});

const start = async () => {
  try {
    await server.listen({ port: PORT, host: HOST });
  } catch (err: unknown) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
