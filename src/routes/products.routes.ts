import { FastifyInstance } from "fastify";
import { listProducts } from "../controllers/product.controller";

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.get("/", listProducts);
}
