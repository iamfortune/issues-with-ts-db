/// <reference path="../global.d.ts" />
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
) {
  fastify.decorate("sayHello", "sayHello");

  function sayHello(name: string) {
    return `${opts.greeting} ${name}`;
  }
}
