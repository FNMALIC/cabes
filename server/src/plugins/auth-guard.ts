import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

/**
 * Wrapped with fastify-plugin so this hook attaches to the *parent* context
 * it's registered into (the `/admin` scope in app.ts) rather than a new
 * isolated child context of its own. Fastify hooks propagate down to all
 * children of the context they're attached to, so this still only guards
 * routes nested under `/admin` — it does not leak out to public routes
 * registered as siblings of the admin scope.
 */
async function authGuardPlugin(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });
}

export const authGuard = fp(authGuardPlugin);
