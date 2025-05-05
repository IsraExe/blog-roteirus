-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "nm_user" TEXT NOT NULL,
    "de_email" TEXT NOT NULL,
    "de_password" TEXT,
    "auth_provider" TEXT NOT NULL DEFAULT 'local',
    "de_profile_pic" TEXT,
    "de_bio" TEXT,
    "id_role" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "role" (
    "id_role" SERIAL NOT NULL,
    "nm_role" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "post" (
    "id_post" SERIAL NOT NULL,
    "nm_title" TEXT NOT NULL,
    "de_content" TEXT NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL,
    "id_user" INTEGER NOT NULL,
    "de_status" INTEGER NOT NULL DEFAULT 0,
    "id_category" INTEGER,
    "cover_image" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id_post")
);

-- CreateTable
CREATE TABLE "category" (
    "id_category" SERIAL NOT NULL,
    "nm_name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "tag" (
    "id_tag" SERIAL NOT NULL,
    "nm_name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "comment" (
    "id_comment" SERIAL NOT NULL,
    "de_content" TEXT NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id_comment")
);

-- CreateTable
CREATE TABLE "media" (
    "id_media" SERIAL NOT NULL,
    "de_url" TEXT NOT NULL,
    "id_post" INTEGER,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id_media")
);

-- CreateTable
CREATE TABLE "like" (
    "id_like" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id_like")
);

-- CreateTable
CREATE TABLE "_TagPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_de_email_key" ON "user"("de_email");

-- CreateIndex
CREATE UNIQUE INDEX "role_nm_role_key" ON "role"("nm_role");

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

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id_category") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id_post") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagPosts" ADD CONSTRAINT "_TagPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "post"("id_post") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagPosts" ADD CONSTRAINT "_TagPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id_tag") ON DELETE CASCADE ON UPDATE CASCADE;
