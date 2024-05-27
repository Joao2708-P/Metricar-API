/*
  Warnings:

  - You are about to drop the `TipoDoCarro` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type_slug` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_tipo_do_carro_id_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "type_slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "TipoDoCarro";

-- CreateTable
CREATE TABLE "CarPromotion" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "car_id" TEXT NOT NULL,

    CONSTRAINT "CarPromotion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarPromotion" ADD CONSTRAINT "CarPromotion_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
