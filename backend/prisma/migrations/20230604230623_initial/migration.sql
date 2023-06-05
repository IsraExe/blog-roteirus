-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "nm_user" VARCHAR(255) NOT NULL,
    "desc_user" VARCHAR(255) NOT NULL,
    "avatar" BYTEA,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "id_role" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Role" (
    "id_role" SERIAL NOT NULL,
    "nm_role" VARCHAR(255) NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "Post" (
    "id_post" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id_post")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_role_key" ON "User"("id_role");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_user_key" ON "Role"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_user_key" ON "Post"("id_user");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "Role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;
