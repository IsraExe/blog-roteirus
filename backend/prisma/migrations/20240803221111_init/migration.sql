-- CreateTable
CREATE TABLE "user" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_user" TEXT NOT NULL,
    "de_email" TEXT NOT NULL,
    "de_password" TEXT NOT NULL,
    "de_profile_pic" TEXT,
    "de_bio" TEXT
);

-- CreateTable
CREATE TABLE "post" (
    "id_post" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_title" TEXT NOT NULL,
    "de_content" TEXT NOT NULL,
    "dt_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,
    "nm_status" INTEGER NOT NULL DEFAULT 0,
    "id_category" INTEGER,
    CONSTRAINT "post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "post_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category" ("id_category") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "role" (
    "id_role" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id_user" INTEGER NOT NULL,
    "id_role" INTEGER NOT NULL,

    PRIMARY KEY ("id_user", "id_role"),
    CONSTRAINT "user_roles_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id_user") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_roles_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "role" ("id_role") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "category" (
    "id_category" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tag" (
    "id_tag" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nm_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "comment" (
    "id_comment" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "de_content" TEXT NOT NULL,
    "dt_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    CONSTRAINT "comment_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id_user") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "comment_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post" ("id_post") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "media" (
    "id_media" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "de_url" TEXT NOT NULL,
    "id_post" INTEGER,
    CONSTRAINT "media_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post" ("id_post") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "like" (
    "id_like" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    CONSTRAINT "like_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user" ("id_user") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "like_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post" ("id_post") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TagPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TagPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "post" ("id_post") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TagPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "tag" ("id_tag") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_de_email_key" ON "user"("de_email");

-- CreateIndex
CREATE UNIQUE INDEX "role_nm_role_key" ON "role"("nm_role");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_id_user_id_role_key" ON "user_roles"("id_user", "id_role");

-- CreateIndex
CREATE UNIQUE INDEX "category_nm_name_key" ON "category"("nm_name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_nm_name_key" ON "tag"("nm_name");

-- CreateIndex
CREATE UNIQUE INDEX "like_id_user_id_post_key" ON "like"("id_user", "id_post");

-- CreateIndex
CREATE UNIQUE INDEX "_TagPosts_AB_unique" ON "_TagPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_TagPosts_B_index" ON "_TagPosts"("B");
