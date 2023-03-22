USE [myApp]
GO
SET IDENTITY_INSERT [dbo].[ItemCategories] ON 

INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (1, N'textile', N'Rui')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (2, N'ceramics', N'Manuel')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (3, N'textile', N'Rute')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (4, N'glass', N'Vitor')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (5, N'glass', N'André')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (6, N'painting', N'Rodrigo')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (7, N'sculpture', N'Maria')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (8, N'sculpture', N'Conceição')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (9, N'painting', N'Luísa')
SET IDENTITY_INSERT [dbo].[ItemCategories] OFF
GO
SET IDENTITY_INSERT [dbo].[Offers] ON 

INSERT [dbo].[Offers] ([OfferId], [Title], [Discount]) VALUES (1, N'new year outlet', 25)
INSERT [dbo].[Offers] ([OfferId], [Title], [Discount]) VALUES (2, N'christmas season', 15)
INSERT [dbo].[Offers] ([OfferId], [Title], [Discount]) VALUES (3, N'ausgust special', 5)
INSERT [dbo].[Offers] ([OfferId], [Title], [Discount]) VALUES (4, N'black friday', 50)
INSERT [dbo].[Offers] ([OfferId], [Title], [Discount]) VALUES (5, N'easter season', 10)
SET IDENTITY_INSERT [dbo].[Offers] OFF
GO
SET IDENTITY_INSERT [dbo].[Items] ON 

INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (1, N'Mona Lisa', 'Miguel', 4, 1, 50, 1, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (2, N'Art 1', 'André', 1, 2, 75, 3, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (3, N'Art 2', 'Bernardo', 2, 3, 120, 5, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (4, N'Pedra', 'Luísa', 4, 5, 300, 5, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (5, N'Tapete', 'Maria', 4, 2, 250, 10, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (6, N'Lista', 'Conceição', 3, 3, 130, 1, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (7, N'Tua', 'Luísa', 2, 1, 2300, 1, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (8, N'Minha', 'Pedro', 1, 3, 1200, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (9, N'Tua', 'Alexandre', 2, 1, 2300, 1, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (10, N'Minha', 'João', 1, 3, 1200, 2, N'')
SET IDENTITY_INSERT [dbo].[Items] OFF
GO
SET IDENTITY_INSERT [dbo].[PaymentMethods] ON 

INSERT [dbo].[PaymentMethods] ([PaymentMethodId], [Type], [Provider], [Available], [Reason]) VALUES (1, N'Cash', N'', N'True', N'')
INSERT [dbo].[PaymentMethods] ([PaymentMethodId], [Type], [Provider], [Available], [Reason]) VALUES (2, N'Card Payment', N'CGD', N'True', N'')
INSERT [dbo].[PaymentMethods] ([PaymentMethodId], [Type], [Provider], [Available], [Reason]) VALUES (3, N'Net Banking', N'Caja Rural', N'True', N'')
INSERT [dbo].[PaymentMethods] ([PaymentMethodId], [Type], [Provider], [Available], [Reason]) VALUES (4, N'Net Banking', N'Santander Bank', N'True', N'')
INSERT [dbo].[PaymentMethods] ([PaymentMethodId], [Type], [Provider], [Available], [Reason]) VALUES (5, N'Net Banking', N'CGD', N'False', N'server down')
INSERT [dbo].[PaymentMethods] ([PaymentMethodId], [Type], [Provider], [Available], [Reason]) VALUES (6, N'MB WAY', N'Millennium BCP', N'True', N'')
INSERT [dbo].[PaymentMethods] ([PaymentMethodId], [Type], [Provider], [Available], [Reason]) VALUES (7, N'PayPal', N'PayPal', N'True', N'')
INSERT [dbo].[PaymentMethods] ([PaymentMethodId], [Type], [Provider], [Available], [Reason]) VALUES (8, N'MB WAY', N'Santander Totta', N'True', N'')
SET IDENTITY_INSERT [dbo].[PaymentMethods] OFF
GO