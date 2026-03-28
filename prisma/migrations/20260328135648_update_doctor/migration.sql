/*
  Warnings:

  - Changed the type of `contactNumber` on the `Doctor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "contactNumber",
ADD COLUMN     "contactNumber" TEXT NOT NULL;
