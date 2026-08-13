import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";
import { createContactSubmissionSchema } from "./contact.schemas.js";

export async function contactRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/contact",
    { config: { rateLimit: { max: 5, timeWindow: "10 minutes" } } },
    async (request, reply) => {
      const parsed = createContactSubmissionSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.code(400).send({ error: "Invalid submission", details: parsed.error.flatten().fieldErrors });
      }

      await prisma.contactSubmission.create({ data: parsed.data });
      return reply.code(201).send({ ok: true });
    },
  );
}
