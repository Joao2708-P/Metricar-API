/*
  Warnings:

  - You are about to drop the column `tipo_do_carro` on the `Car` table. All the data in the column will be lost.
  - Added the required column `tipo_do_carro_id` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Car] DROP COLUMN [tipo_do_carro];
ALTER TABLE [dbo].[Car] ADD [tipo_do_carro_id] NVARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[TipoDoCarro] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TipoDoCarro_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_tipo_do_carro_id_fkey] FOREIGN KEY ([tipo_do_carro_id]) REFERENCES [dbo].[TipoDoCarro]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
