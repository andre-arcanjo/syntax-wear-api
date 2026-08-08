import { RegisterEmailNewsletter } from '../types';
import { AppError } from '../utils/app-error';
import { prisma } from '../utils/prisma';

export const registerEmailNewsletter = async (
  data: RegisterEmailNewsletter,
) => {
  const existingEmail = await prisma.newsletter.findUnique({
    where: { email: data.email },
  });

  if (existingEmail) {
    throw new AppError('Email já cadastrado', 409);
  }

  const newEmailNewsletter = await prisma.newsletter.create({ data });
  return newEmailNewsletter;
};
