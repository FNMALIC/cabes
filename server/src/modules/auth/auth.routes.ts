import type { FastifyInstance } from "fastify";
import { env } from "../../config/env.js";
import { authCookieOptions } from "../../lib/auth.js";
import { prisma } from "../../lib/prisma.js";
import { verifyPassword } from "../../lib/password.js";
import { loginBodySchema } from "./auth.schemas.js";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/login",
    { config: { rateLimit: { max: 10, timeWindow: "10 minutes" } } },
    async (request, reply) => {
      const parsed = loginBodySchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send({ error: "Invalid credentials payload" });
      }

      const { email, password } = parsed.data;
      const admin = await prisma.adminUser.findUnique({ where: { email } });
      const passwordMatches = admin ? await verifyPassword(admin.passwordHash, password) : false;

      if (!admin || !passwordMatches) {
        return reply.code(401).send({ error: "Invalid email or password" });
      }

      const token = await reply.jwtSign({ sub: admin.id, email: admin.email });
      reply.setCookie(env.COOKIE_NAME, token, authCookieOptions());
      return reply.send({ email: admin.email });
    },
  );

  fastify.post("/logout", async (request, reply) => {
    reply.clearCookie(env.COOKIE_NAME, { path: "/", domain: env.COOKIE_DOMAIN || undefined });
    return reply.send({ ok: true });
  });

  fastify.get("/me", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      return reply.code(401).send({ error: "Unauthorized" });
    }
    return reply.send({ email: request.user.email });
  });
}
