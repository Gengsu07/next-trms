import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin", 12);
  const user = await prisma.user.upsert({
    where: { username: "Admin" },
    update: {},
    create: {
      email: "admin@pajak.go.id",
      username: "Admin",
      password,
      name: "Admin-TRMS",
    },
  });
  console.log({ user });
}

main();
