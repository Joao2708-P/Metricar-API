/*
  Warnings:

  - You are about to drop the `Promotions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `promotion_slug` to the `Cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Promotions" DROP CONSTRAINT "Promotions_car_id_fkey";

-- AlterTable
ALTER TABLE "Cars" ADD COLUMN     "promotion_slug" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "CreditCars" ALTER COLUMN "expiration" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "Promotions";
