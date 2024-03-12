import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import csv from "csv-parser";
import * as fs from "fs";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const filePath = "user.csv"; // Replace with your actual CSV path

  // Read and parse the CSV file
  const users: User[] = [];
  const readStream = fs.createReadStream(filePath);

  readStream
    .pipe(csv())
    .on("data", (user: any) => {
      // Type 'any' as user object structure might be unknown
      users.push(user);
    })
    .on("end", async () => {
      for (const user of users) {
        const hashedPassword = await hash(user.password, 12); // Replace with secure hashing

        await prisma.user.upsert({
          where: { username: user.username || "" },
          update: {},
          create: {
            email: user.email,
            username: user.username,
            password: hashedPassword,
            name: user.name, // Ensure all required fields are mapped
          },
        });
      }
      console.log("Users created/updated successfully.");
      await prisma.$disconnect();
    })
    .on("error", async (error: any) => {
      // Type 'any' as error type might be unknown
      console.error("Error parsing CSV:", error);
      await prisma.$disconnect();
      process.exit(1);
    });
}

main();
