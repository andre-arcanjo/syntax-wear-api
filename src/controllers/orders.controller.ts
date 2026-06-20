import { FastifyReply, FastifyRequest } from "fastify";
import { createOrderSchema, orderFiltersSchema } from "../utils/validator";
import { CreateOrder, OrderFilters } from "../types";
import {
  createOrder,
  getOrderById,
  getOrders,
} from "../services/orders.service";

export async function listOrders(request: FastifyRequest, reply: FastifyReply) {
  const filters = orderFiltersSchema.parse(request.query as OrderFilters);
  const orders = await getOrders(filters);
  reply.status(200).send(orders);
}

export async function getOrder(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const id = parseInt(request.params.id, 10);
  const order = await getOrderById(id);
  reply.status(200).send(order);
}

export async function createNewOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createOrderSchema.parse(request.body as CreateOrder);
  const order = await createOrder(data);
  reply.status(201).send({
    message: "Pedido criado com sucesso",
    orderId: order.id,
  });
}
