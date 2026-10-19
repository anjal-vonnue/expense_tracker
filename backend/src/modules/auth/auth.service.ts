import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../prisma/connection.js";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

export async function register(name: string, email: string, password: string) {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("ALREADY");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
    omit: {
      passwordHash: true,
    },
  });

  const token = jwt.sign(
    {
      userId: newUser.id,
    },
    JWT_SECRET!,
    {
      expiresIn: "12h",
    },
  );

  return { newUser, token };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("INVALID");
  }

  const comparePassword = await bcrypt.compare(password, user.passwordHash);

  if (!comparePassword) {
    throw new Error("INVALID");
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET!,
    {
      expiresIn: "12h",
    },
  );

  return { user, token };
}

export async function whoami(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    omit: {
      passwordHash: true,
    },
  });

  if (!user) {
    throw new Error("NOT_FOUND");
  }

  return user;
}
