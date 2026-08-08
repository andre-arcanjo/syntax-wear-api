import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify/types/request';
import { registerEmailNewsletterSchema } from '../utils/validator';
import { registerEmailNewsletter } from '../services/newsleter.service';

export async function createNewEmailNewsletter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = request.body;

  const validate = registerEmailNewsletterSchema.parse(body);

  await registerEmailNewsletter(validate);

  reply.status(201).send({ message: 'Email cadastrado com sucesso' });
}
