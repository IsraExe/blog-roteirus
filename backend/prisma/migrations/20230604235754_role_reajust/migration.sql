/*
  Warnings:

  - You are about to drop the column `id_role` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_id_role_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "id_role";
