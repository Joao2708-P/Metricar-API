-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "card_credit" TEXT NOT NULL,
    "cretadeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
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
    "cretadeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL,
    "data_da_reserva" TIMESTAMP(3) NOT NULL,
    "data_de_devolucao" TIMESTAMP(3) NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_car" TEXT NOT NULL,
    "preco_total" DECIMAL(65,30) NOT NULL,
    "card_credit_id" TEXT NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "cvv" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "saldo" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoDoCarro" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TipoDoCarro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_cardNumber_key" ON "CreditCard"("cardNumber");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_tipo_do_carro_id_fkey" FOREIGN KEY ("tipo_do_carro_id") REFERENCES "TipoDoCarro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_car_fkey" FOREIGN KEY ("id_car") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
