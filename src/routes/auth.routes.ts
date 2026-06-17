import { FastifyInstance } from "fastify";
import { register } from "../controllers/auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    {
      schema: {
        tags: ["Auth"],
        description: "Registra um novo usuário e retorna um token JWT",
        body: {
          type: "object",
          required: ["email", "password", "firstName", "lastName"],
          properties: {
            firstName: { type: "string", description: "Nome do usuário" },
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
            },
            lastName: { type: "string", description: "Sobrenome do usuário" },
            password: {
              type: "string",
              minLength: 6,
              description: "Senha do usuário",
            },
            cpf: {
              type: "string",
              description: "CPF do usuário (apenas números)",
            },
            birthDate: {
              type: "string",
              format: "date",
              description: "Data de nascimento do usuário (YYYY-MM-DD)",
            },
            phone: {
              type: "string",
              description:
                "Número de telefone do usuário (com DDD, somente números)",
            },
          },
        },
      },
    },
    register,
  );
}
