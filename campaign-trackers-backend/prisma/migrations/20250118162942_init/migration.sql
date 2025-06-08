/*
  Warnings:

  - You are about to drop the column `budget` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the `Analytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerEngagement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlatformIntegration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Strategy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerEngagement" DROP CONSTRAINT "CustomerEngagement_businessId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformIntegration" DROP CONSTRAINT "PlatformIntegration_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Strategy" DROP CONSTRAINT "Strategy_businessId_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "budget",
DROP COLUMN "endDate",
DROP COLUMN "name",
DROP COLUMN "platform",
DROP COLUMN "updatedAt",
ADD COLUMN     "reditString" TEXT,
ADD COLUMN     "telegramString" TEXT,
ADD COLUMN     "whatsappString" TEXT,
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Analytics";

-- DropTable
DROP TABLE "Content";

-- DropTable
DROP TABLE "CustomerEngagement";

-- DropTable
DROP TABLE "PlatformIntegration";

-- DropTable
DROP TABLE "Strategy";

-- CreateTable
CREATE TABLE "CampaignUser" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "name" TEXT,
    "age" INTEGER,
    "phoneNumber" TEXT,
    "location" TEXT,
    "platform" TEXT,
    "clickTime" TEXT,
    "conversionRate" DOUBLE PRECISION,
    "ctr" DOUBLE PRECISION,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignUser" ADD CONSTRAINT "CampaignUser_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
