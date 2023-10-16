BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [card_credit] DECIMAL(32,16) NOT NULL,
    [saldo] DECIMAL(32,16) NOT NULL,
    [cretadeAt] DATETIME2 NOT NULL,
    [updateAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Car] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [preco] DECIMAL(32,16) NOT NULL,
    [quilometragem] INT NOT NULL,
    [ano] INT NOT NULL,
    [condicao] NVARCHAR(1000) NOT NULL,
    [exterior_color] NVARCHAR(1000) NOT NULL,
    [interior_color] NVARCHAR(1000) NOT NULL,
    [disponibilidade] BIT NOT NULL,
    [tipo_do_carro] NVARCHAR(1000) NOT NULL,
    [cretadeAt] DATETIME2 NOT NULL,
    [updateAt] DATETIME2 NOT NULL,
    CONSTRAINT [Car_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reserva] (
    [id] NVARCHAR(1000) NOT NULL,
    [data_da_reserva] INT NOT NULL,
    [data_de_devolucao] INT NOT NULL,
    [id_user] NVARCHAR(1000) NOT NULL,
    [id_car] NVARCHAR(1000) NOT NULL,
    [preco_total] DECIMAL(32,16) NOT NULL,
    [cretadeAt] DATETIME2 NOT NULL,
    [updateAt] DATETIME2 NOT NULL,
    CONSTRAINT [Reserva_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Reserva] ADD CONSTRAINT [Reserva_id_car_fkey] FOREIGN KEY ([id_car]) REFERENCES [dbo].[Car]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reserva] ADD CONSTRAINT [Reserva_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
