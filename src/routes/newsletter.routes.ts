import { FastifyInstance } from 'fastify';
import { createNewEmailNewsletter } from '../controllers/newsletter.controller';
import { RegisterEmailNewsletter } from '../types';

export default async function newsletterRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: RegisterEmailNewsletter }>(
    '/',
    {
      schema: {
        tags: ['Newsletter'],
        description: 'Cadastra um email na newsletter',
        body: {
          type: 'object',
          required: ['email'],
          additionalProperties: false,
          properties: {
            email: {
              type: 'string',
              description: 'Email que receberá a newsletter',
            },
          },
        },
        response: {
          201: {
            description: 'Email cadastrado com sucesso',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          400: {
            description: 'Erro de validação',
            type: 'object',
            properties: {
              message: { type: 'string' },
              errors: {
                type: 'object',
                additionalProperties: true,
              },
            },
          },
          409: {
            description: 'Email já cadastrado',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Erro interno do servidor',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    createNewEmailNewsletter,
  );
}
