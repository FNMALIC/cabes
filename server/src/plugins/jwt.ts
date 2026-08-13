import jwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { env } from "../config/env.js";

export default fp(async (fastify) => {
  await fastify.register(jwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: env.COOKIE_NAME,
      signed: false,
    },
    sign: {
      expiresIn: env.JWT_EXPIRES_IN,
    },
  });
});
