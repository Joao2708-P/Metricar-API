/*
  Warnings:

  - You are about to drop the column `saldo` on the `User` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [saldo];

-- CreateTable
CREATE TABLE [dbo].[CreditCard] (
    [id] NVARCHAR(1000) NOT NULL,
    [cardNumber] NVARCHAR(1000) NOT NULL,
    [expiration] NVARCHAR(1000) NOT NULL,
    [cvv] NVARCHAR(1000) NOT NULL,
    [user_id] NVARCHAR(1000) NOT NULL,
    [saldo] DECIMAL(32,16) NOT NULL,
    [createdAt] DATETIME2 NOT NULL,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [CreditCard_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CreditCard_cardNumber_key] UNIQUE NONCLUSTERED ([cardNumber])
);

-- AddForeignKey
ALTER TABLE [dbo].[CreditCard] ADD CONSTRAINT [CreditCard_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
