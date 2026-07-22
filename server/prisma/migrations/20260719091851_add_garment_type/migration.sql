/*
  Warnings:

  - You are about to drop the column `garmentType` on the `measurement` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `GarmentType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garmentTypeId` to the `Measurement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `garmenttype` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `measurement` DROP COLUMN `garmentType`,
    ADD COLUMN `garmentTypeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_garmentTypeId_fkey` FOREIGN KEY (`garmentTypeId`) REFERENCES `GarmentType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
