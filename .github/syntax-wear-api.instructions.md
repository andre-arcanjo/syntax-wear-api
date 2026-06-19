---
name: syntax-wear-api
description: "Instruções de workspace para o backend Syntax Wear API. Aplique estas convenções ao código TypeScript, ao schema Prisma e aos testes."
---

Use a arquitetura existente do repositório e o estilo TypeScript de forma consistente.

- Mantenha `controllers`, `services`, `routes`, `middlewares`, `utils` e `types` separados.
- Prefira a sintaxe `import` / `export` e mantenha a estratégia de módulos do projeto.
- Use a tipagem `FastifyRequest` / `FastifyReply` em todos os manipuladores de rota.
- Valide payloads de requisição com Zod antes da lógica de negócio. Não confie em `request.body` ou valores de query sem parsear.
- Use `request.server.jwt.sign(...)` para geração de JWT e mantenha a lógica de autenticação em middleware ou helpers de serviço.
- Acesse o banco de dados por meio do cliente Prisma compartilhado em `src/utils/prisma.ts`.
- Trate erros de forma centralizada com o padrão de middleware de erro existente; retorne respostas estruturadas para erros de validação, autenticação e Prisma.
- Mantenha os manipuladores de rota enxutos delegando regras de negócio para funções de serviço.
- Use mensagens de validação e respostas de API em Português neste repositório, conforme o código existente.
- Evite adicionar saída compilada ao controle de versão; preserve o repositório apenas como código-fonte.

Ao editar schema Prisma ou migrations:
- Mantenha as definições de modelo consistentes com os relacionamentos atuais de `User` e `Product`.
- Use nomes de campos claros e torne obrigatórios os campos que devem ser não nulos.

Ao adicionar testes:
- Foque no comportamento pelas rotas HTTP públicas e pelas camadas de serviço.
- Prefira casos de teste pequenos e focados que reflitam os formatos reais de requisição/resposta do Fastify.
