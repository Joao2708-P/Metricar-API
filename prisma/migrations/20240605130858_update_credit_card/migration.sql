/*
  Warnings:

  - You are about to drop the column `saldo` on the `creditCards` table. All the data in the column will be lost.
  - Added the required column `balance` to the `creditCards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "creditCards" DROP COLUMN "saldo",
ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL;
