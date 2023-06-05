-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_id_role_fkey";

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;
