import Fastify, { type FastifyInstance } from "fastify";
import { env } from "./config/env.js";
import corsPlugin from "./plugins/cors.js";
import cookiePlugin from "./plugins/cookie.js";
import jwtPlugin from "./plugins/jwt.js";
import rateLimitPlugin from "./plugins/rate-limit.js";
import { authGuard } from "./plugins/auth-guard.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { contactRoutes } from "./modules/contact/contact.routes.js";
import { contactAdminRoutes } from "./modules/contact/contact-admin.routes.js";
import { testimonialsRoutes } from "./modules/testimonials/testimonials.routes.js";
import { testimonialsAdminRoutes } from "./modules/testimonials/testimonials-admin.routes.js";

export async function buildApp(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      level: env.isProduction ? "info" : "debug",
      transport: env.isProduction ? undefined : { target: "pino-pretty" },
    },
  });

  await fastify.register(corsPlugin);
  await fastify.register(cookiePlugin);
  await fastify.register(jwtPlugin);
  await fastify.register(rateLimitPlugin);

  fastify.get("/healthz", async () => ({ ok: true }));

  // Public routes
  await fastify.register(contactRoutes);
  await fastify.register(testimonialsRoutes);
  await fastify.register(authRoutes, { prefix: "/auth" });

  // Admin routes: authGuard is registered inside this encapsulated context,
  // so every route nested below requires a valid session cookie.
  await fastify.register(
    async (adminScope) => {
      await adminScope.register(authGuard);
      await adminScope.register(testimonialsAdminRoutes, { prefix: "/testimonials" });
      await adminScope.register(contactAdminRoutes, { prefix: "/contact-submissions" });
    },
    { prefix: "/admin" },
  );

  return fastify;
}
