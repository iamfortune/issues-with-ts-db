/// <reference path="../global.d.ts" />
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    sayHello: (name: string) => string;
  }
}

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.decorate("sayHello", sayHello);

  function sayHello(name: string) {
    return `${opts.greeting || "Hello"} ${name}`;
  }

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
      const { name = "Guest" } = request.query as { name?: string };
      const greeting = fastify.sayHello(name);
      return { result: `${greeting}, Welcome to Platformatic` };
    }
  );
}
