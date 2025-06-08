/*
  Warnings:

  - You are about to drop the column `analytics` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "analytics",
DROP COLUMN "status";
