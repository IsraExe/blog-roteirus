/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT 'temp-slug';

-- CreateTable
CREATE TABLE "old_slugs" (
    "id_old_slug" SERIAL NOT NULL,
    "slug_antigo" TEXT NOT NULL,
    "id_post" INTEGER NOT NULL,

    CONSTRAINT "old_slugs_pkey" PRIMARY KEY ("id_old_slug")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");

-- AddForeignKey
ALTER TABLE "old_slugs" ADD CONSTRAINT "old_slugs_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE CASCADE ON UPDATE CASCADE;
