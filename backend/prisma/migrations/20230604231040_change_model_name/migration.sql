/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_id_user_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_role_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "nm_user" VARCHAR(255) NOT NULL,
    "desc_user" VARCHAR(255) NOT NULL,
    "avatar" BYTEA,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "id_role" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "role" (
    "id_role" SERIAL NOT NULL,
    "nm_role" VARCHAR(255) NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "post" (
    "id_post" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id_post")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_role_key" ON "user"("id_role");

-- CreateIndex
CREATE UNIQUE INDEX "role_id_user_key" ON "role"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "post_id_user_key" ON "post"("id_user");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;
