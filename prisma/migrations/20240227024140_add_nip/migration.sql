/*
  Warnings:

  - A unique constraint covering the columns `[nip]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nip` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "nip" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_nip_key" ON "users"("nip");
