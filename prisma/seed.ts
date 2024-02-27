import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("p@ssw0rd", 12);
  const user = await prisma.user.upsert({
    where: { username: "810202558" },
    update: {},
    create: {
      email: "sugeng.wahyudi@pajak.go.id",
      username: "810202558",
      password,
      name: "GengsuDev",
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
