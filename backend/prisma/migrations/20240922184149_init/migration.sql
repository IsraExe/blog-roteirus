/*
  Warnings:

  - You are about to drop the column `coverImage` on the `post` table. All the data in the column will be lost.

*/
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
    "cover_image" TEXT,
    CONSTRAINT "post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "post_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category" ("id_category") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_post" ("de_content", "de_status", "dt_created", "dt_updated", "id_category", "id_post", "id_user", "nm_title") SELECT "de_content", "de_status", "dt_created", "dt_updated", "id_category", "id_post", "id_user", "nm_title" FROM "post";
DROP TABLE "post";
ALTER TABLE "new_post" RENAME TO "post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;