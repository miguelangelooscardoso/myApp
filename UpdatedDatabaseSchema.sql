-- Added AspNetUsers to my database schema!!!
ALTER TABLE [dbo].[Orders] WITH CHECK ADD CONSTRAINT [FK_Orders_AspNetUsers] FOREIGN KEY ([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_AspNetUsers]
GO

ALTER TABLE [dbo].[Payments] WITH CHECK ADD CONSTRAINT [FK_Payments_AspNetUsers] FOREIGN KEY ([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Payments] CHECK CONSTRAINT [FK_Payments_AspNetUsers]
GO

ALTER TABLE [dbo].[Feedbacks] WITH CHECK ADD CONSTRAINT [FK_Feedbacks_AspNetUsers] FOREIGN KEY ([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[Feedbacks] CHECK CONSTRAINT [FK_Feedbacks_AspNetUsers]
GO


