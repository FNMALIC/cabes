import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";
import { createTestimonialSchema, updateTestimonialSchema } from "./testimonials.schemas.js";

export async function testimonialsAdminRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (_request, reply) => {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return reply.send(testimonials);
  });

  fastify.post("/", async (request, reply) => {
    const parsed = createTestimonialSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "Invalid testimonial", details: parsed.error.flatten().fieldErrors });
    }

    const created = await prisma.testimonial.create({ data: parsed.data });
    return reply.code(201).send(created);
  });

  fastify.patch<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const parsed = updateTestimonialSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "Invalid testimonial", details: parsed.error.flatten().fieldErrors });
    }

    try {
      const updated = await prisma.testimonial.update({
        where: { id: request.params.id },
        data: parsed.data,
      });
      return reply.send(updated);
    } catch {
      return reply.code(404).send({ error: "Testimonial not found" });
    }
  });

  fastify.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    try {
      await prisma.testimonial.delete({ where: { id: request.params.id } });
      return reply.code(204).send();
    } catch {
      return reply.code(404).send({ error: "Testimonial not found" });
    }
  });
}
