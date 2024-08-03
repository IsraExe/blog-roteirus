/*
  Warnings:

  - You are about to drop the `user_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `nm_status` on the `post` table. All the data in the column will be lost.
  - Added the required column `id_role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_roles_id_user_id_role_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user_roles";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_post" (
    "id_post" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_title" TEXT NOT NULL,
    "de_content" TEXT NOT NULL,
    "dt_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,
    "de_status" INTEGER NOT NULL DEFAULT 0,
    "id_category" INTEGER,
    CONSTRAINT "post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "post_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category" ("id_category") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_post" ("de_content", "dt_created", "dt_updated", "id_category", "id_post", "id_user", "nm_title") SELECT "de_content", "dt_created", "dt_updated", "id_category", "id_post", "id_user", "nm_title" FROM "post";
DROP TABLE "post";
ALTER TABLE "new_post" RENAME TO "post";
CREATE TABLE "new_user" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_user" TEXT NOT NULL,
    "de_email" TEXT NOT NULL,
    "de_password" TEXT NOT NULL,
    "de_profile_pic" TEXT,
    "de_bio" TEXT,
    "id_role" INTEGER NOT NULL,
    CONSTRAINT "user_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "role" ("id_role") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user" ("de_bio", "de_email", "de_password", "de_profile_pic", "id_user", "nm_user") SELECT "de_bio", "de_email", "de_password", "de_profile_pic", "id_user", "nm_user" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_de_email_key" ON "user"("de_email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
