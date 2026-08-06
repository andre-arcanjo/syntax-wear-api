import { FastifyRequest, FastifyReply } from 'fastify';
import {
  orderFiltersSchema,
  createOrderSchema,
  updateOrderSchema,
} from '../utils/validator';
import { OrderFilters, CreateOrder, UpdateOrder } from '../types';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  cancelOrder,
} from '../services/orders.service';

interface AuthenticatedUser {
  id: number;
  role: 'USER' | 'ADMIN';
}

export async function listOrders(request: FastifyRequest, reply: FastifyReply) {
  const filters = orderFiltersSchema.parse(request.query as OrderFilters);

  const user = request.user as AuthenticatedUser;

  if (user.role !== 'ADMIN') {
    return reply.status(403).send({
      message: 'Acesso negado. Requer permissão de administrador.',
    });
  }

  const orders = await getOrders(filters, user.id, true);
  reply.status(200).send(orders);
}

export async function listMyOrders(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const filters = orderFiltersSchema.parse(request.query as OrderFilters);
  const user = request.user as AuthenticatedUser;

  const orders = await getOrders(filters, user.id, false);
  reply.status(200).send(orders);
}

export async function getOrder(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const id = parseInt(request.params.id, 10);

  // Extrair userId e role do token JWT
  const user = request.user as AuthenticatedUser;
  const requestingUserId = user.id;
  const isAdmin = user.role === 'ADMIN';

  const order = await getOrderById(id, requestingUserId, isAdmin);
  reply.status(200).send(order);
}

export async function createNewOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createOrderSchema.parse(request.body as CreateOrder);
  const user = request.user as AuthenticatedUser;
  const order = await createOrder(data, user.id);
  reply.status(201).send({
    message: 'Pedido criado com sucesso',
    orderId: order.id,
    subtotal: order.subtotal,
    shippingCost: order.shippingCost,
    total: order.total,
  });
}

export async function updateExistingOrder(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const id = parseInt(request.params.id, 10);
  const data = updateOrderSchema.parse(request.body as UpdateOrder);

  // Extrair userId e role do token JWT
  const user = request.user as AuthenticatedUser;
  const requestingUserId = user.id;
  const isAdmin = user.role === 'ADMIN';

  const order = await updateOrder(id, data, requestingUserId, isAdmin);
  reply.status(200).send(order);
}

export async function deleteExistingOrder(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const id = parseInt(request.params.id, 10);

  // Extrair userId e role do token JWT
  const user = request.user as AuthenticatedUser;
  const requestingUserId = user.id;
  const isAdmin = user.role === 'ADMIN';

  await cancelOrder(id, requestingUserId, isAdmin);
  reply.status(200).send({
    message: 'Pedido cancelado com sucesso',
  });
}
