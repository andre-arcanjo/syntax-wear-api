import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import z, { ZodError } from 'zod';

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      
      message: 'Erro de validação(zod)',
      errors: z.treeifyError(error),
    });
  }

  if (error.code === 'FST_ERR_VALIDATION') {
    console.log(error.validation);
    return reply.status(400).send({
      message: 'Erro de validação(fastify)',
      errors: error.validation,
    });
  }

  // Não expor detalhes do erro em produção
  return reply
    .status(500)
    .send({ message: 'Erro interno do servidor' });
};
