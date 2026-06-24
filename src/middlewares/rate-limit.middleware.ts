import { FastifyRequest, FastifyReply } from 'fastify';

interface IPRequestMap {
  [key: string]: { count: number; resetTime: number };
}

const requestMap: IPRequestMap = {};
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos
const AUTH_LIMIT = 5; // 5 tentativas por IP em 15 minutos

export const authRateLimit = (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const ip = request.ip;
  const now = Date.now();

  if (!requestMap[ip]) {
    requestMap[ip] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return;
  }

  if (now > requestMap[ip].resetTime) {
    requestMap[ip] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return;
  }

  requestMap[ip].count++;

  if (requestMap[ip].count > AUTH_LIMIT) {
    reply.status(429).send({
      message: 'Muitas tentativas de autenticação. Tente novamente em 15 minutos.',
      retryAfter: Math.ceil(
        (requestMap[ip].resetTime - now) / 1000,
      ),
    });
  }
};
