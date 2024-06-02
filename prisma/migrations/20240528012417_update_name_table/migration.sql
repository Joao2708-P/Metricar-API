/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarPromotion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CreditCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarPromotion" DROP CONSTRAINT "CarPromotion_car_id_fkey";

-- DropForeignKey
ALTER TABLE "CreditCard" DROP CONSTRAINT "CreditCard_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_id_car_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_id_user_fkey";

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "CarPromotion";

-- DropTable
DROP TABLE "CreditCard";

-- DropTable
DROP TABLE "Reserva";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "card_credit" TEXT NOT NULL,
    "cretadeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "quilometragem" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "condicao" TEXT NOT NULL,
    "exterior_color" TEXT NOT NULL,
    "interior_color" TEXT NOT NULL,
    "disponibilidade" BOOLEAN NOT NULL,
    "tipo_do_carro_id" TEXT NOT NULL,
    "type_slug" TEXT NOT NULL,
    "cretadeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservas" (
    "id" TEXT NOT NULL,
    "data_da_reserva" TIMESTAMP(3) NOT NULL,
    "data_de_devolucao" TIMESTAMP(3) NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_car" TEXT NOT NULL,
    "preco_total" DECIMAL(65,30) NOT NULL,
    "card_credit_id" TEXT NOT NULL,

    CONSTRAINT "Reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCars" (
    "id" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "cvv" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "saldo" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditCars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotions" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "car_id" TEXT NOT NULL,

    CONSTRAINT "Promotions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CreditCars_cardNumber_key" ON "CreditCars"("cardNumber");

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_id_car_fkey" FOREIGN KEY ("id_car") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservas" ADD CONSTRAINT "Reservas_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCars" ADD CONSTRAINT "CreditCars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotions" ADD CONSTRAINT "Promotions_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
