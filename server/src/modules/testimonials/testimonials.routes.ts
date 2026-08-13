import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";

export async function testimonialsRoutes(fastify: FastifyInstance) {
  fastify.get("/testimonials", async (request, reply) => {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    reply.header("Cache-Control", "public, max-age=60");
    return reply.send(testimonials);
  });
}
