import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";
import { listSubmissionsQuerySchema, updateSubmissionStatusSchema } from "./contact.schemas.js";

export async function contactAdminRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const parsed = listSubmissionsQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.code(400).send({ error: "Invalid query" });
    }
    const { status, page, pageSize } = parsed.data;

    const where = status ? { status } : {};
    const [items, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return reply.send({ items, total, page, pageSize });
  });

  fastify.patch<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const parsed = updateSubmissionStatusSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: "Invalid status" });
    }

    try {
      const updated = await prisma.contactSubmission.update({
        where: { id: request.params.id },
        data: { status: parsed.data.status },
      });
      return reply.send(updated);
    } catch {
      return reply.code(404).send({ error: "Submission not found" });
    }
  });
}
