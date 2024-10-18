/// <reference path="../global.d.ts" />
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

/** @param {import('fastify').FastifyInstance} fastify */
export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.get(
    "/hello",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const name = (request.query as { name?: string }).name || "Guest";
      return { result: `Hello ${name}, Welcome to Platformatic` };
    }
  );
}
