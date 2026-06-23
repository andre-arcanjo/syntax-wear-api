import { FastifyReply, FastifyRequest } from 'fastify';
import { loginUser, registerUser } from '../services/auth.service';
import { AuthRequest, RegisterRequest } from '../types';
import { loginSchema, registerSchema } from '../utils/validator';

export const register = async (
  request: FastifyRequest<{ Body: RegisterRequest }>,
  reply: FastifyReply,
) => {
  // Lógica de registro de usuário

  const validation = registerSchema.safeParse(request.body);

  if (!validation.success) {
  return reply.status(400).send({
  message: 'Erro de validação',
  errors: validation.error.flatten(),
});
}

  const user = await registerUser(validation.data);

  const token = request.server.jwt.sign({ userId: user.id });

  reply.status(201).send({
    user,
    token,
  });
};

export const login = async (
  request: FastifyRequest<{ Body: AuthRequest }>,
  reply: FastifyReply,
) => {
  const validation = loginSchema.parse(request.body as AuthRequest);

  const user = await loginUser(validation);

  const token = request.server.jwt.sign({ userId: user.id });

  reply.status(200).send({
    user,
    token,
  });
};
