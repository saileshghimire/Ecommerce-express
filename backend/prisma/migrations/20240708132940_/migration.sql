/*
  Warnings:

  - You are about to drop the column `Line` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "Line",
ADD COLUMN     "line" TEXT;
