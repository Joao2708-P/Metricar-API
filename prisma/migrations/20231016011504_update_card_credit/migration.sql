/*
  Warnings:

  - You are about to alter the column `expiration` on the `CreditCard` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `DateTime2`.
  - Added the required column `imagem` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Car] ADD [imagem] NTEXT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[CreditCard] ALTER COLUMN [expiration] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
