import { FastifyInstance } from "fastify";
import { listProducts } from "../controllers/product.controller";
import { autheticate } from "../middlewares/auth.middleware";

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", autheticate);
  fastify.get("/", listProducts);
}
