/*
  Warnings:

  - You are about to drop the column `telegramString` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "telegramString",
ADD COLUMN     "twitterString" TEXT;
