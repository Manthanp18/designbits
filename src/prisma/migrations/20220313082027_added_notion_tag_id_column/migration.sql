/*
  Warnings:

  - A unique constraint covering the columns `[notionTagId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Tag` ADD COLUMN `notionTagId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tag_notionTagId_key` ON `Tag`(`notionTagId`);
