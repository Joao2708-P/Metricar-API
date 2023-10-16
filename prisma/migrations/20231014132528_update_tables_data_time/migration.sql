/*
  Warnings:

  - You are about to drop the column `cretadeAt` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `password` to the `CreditCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_credit_id` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `data_da_reserva` on the `Reserva` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `data_de_devolucao` on the `Reserva` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_cretadeAt_df] DEFAULT CURRENT_TIMESTAMP FOR [cretadeAt];

-- AlterTable
ALTER TABLE [dbo].[CreditCard] ADD CONSTRAINT [CreditCard_createdAt_df] DEFAULT CURRENT_TIMESTAMP FOR [createdAt];
ALTER TABLE [dbo].[CreditCard] ADD [password] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Reserva] DROP COLUMN [cretadeAt],
[updateAt],
[data_da_reserva],
[data_de_devolucao];
ALTER TABLE [dbo].[Reserva] ADD [card_credit_id] NVARCHAR(1000) NOT NULL,
[data_da_reserva] DATETIME2 NOT NULL,
[data_de_devolucao] DATETIME2 NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_cretadeAt_df] DEFAULT CURRENT_TIMESTAMP FOR [cretadeAt];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
