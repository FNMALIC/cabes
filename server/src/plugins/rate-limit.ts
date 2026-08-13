import rateLimit from "@fastify/rate-limit";
import fp from "fastify-plugin";

/**
 * Registered globally but with `global: false` — no route is rate-limited
 * unless it opts in via `{ config: { rateLimit: {...} } }`.
 */
export default fp(async (fastify) => {
  await fastify.register(rateLimit, {
    global: false,
  });
});
