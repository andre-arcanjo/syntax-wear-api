import { FastifyInstance } from 'fastify';
import { calculateShippingCost } from '../services/shipping.service';

export default async function shippingRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: { state: string } }>(
    '/:state',
    {
      schema: {
        tags: ['Shipping'],
        description: 'Calcular o frete a partir da UF de entrega',
        params: {
          type: 'object',
          required: ['state'],
          properties: {
            state: { type: 'string', minLength: 2, maxLength: 2 },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              shippingCost: { type: 'number' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      reply.send({
        shippingCost: calculateShippingCost(request.params.state),
      });
    },
  );
}
