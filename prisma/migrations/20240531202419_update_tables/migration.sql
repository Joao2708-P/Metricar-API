/*
  Warnings:

  - You are about to drop the `Cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CreditCars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CreditCars" DROP CONSTRAINT "CreditCars_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Reservas" DROP CONSTRAINT "Reservas_id_car_fkey";

-- DropForeignKey
ALTER TABLE "Reservas" DROP CONSTRAINT "Reservas_id_user_fkey";

-- DropTable
DROP TABLE "Cars";

-- DropTable
DROP TABLE "CreditCars";

-- DropTable
DROP TABLE "Reservas";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "card_credit" TEXT NOT NULL,
    "cretadeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
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
    "promotion_slug" BOOLEAN NOT NULL,
    "cretadeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id" TEXT NOT NULL,
    "data_da_reserva" TIMESTAMP(3) NOT NULL,
    "data_de_devolucao" TIMESTAMP(3) NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_car" TEXT NOT NULL,
    "preco_total" DECIMAL(65,30) NOT NULL,
    "card_credit_id" TEXT NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creditCards" (
    "id" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expiration" DATE NOT NULL,
    "cvv" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "saldo" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creditCards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "creditCards_cardNumber_key" ON "creditCards"("cardNumber");

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_id_car_fkey" FOREIGN KEY ("id_car") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creditCards" ADD CONSTRAINT "creditCards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
