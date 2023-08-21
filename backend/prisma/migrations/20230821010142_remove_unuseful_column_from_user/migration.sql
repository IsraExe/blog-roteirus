/*
  Warnings:

  - You are about to drop the column `desc_user` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "desc_user",
ALTER COLUMN "password" SET DATA TYPE TEXT;
