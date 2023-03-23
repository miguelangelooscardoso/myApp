USE [myApp]
GO
SET IDENTITY_INSERT [dbo].[ItemCategories] ON 
-- ceramics
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (1, N'ceramics', N'Nina Malterud')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (2, N'ceramics', N'Maria Kristofersson')
-- glass
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (3, N'glass', N'Celia Dowson')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (4, N'glass', N'Edmond Byrne')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (5, N'glass', N'Michéle Oberdieck')
-- painting
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (6, N'painting', N'Hola Lou')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (7, N'painting', N'Ricardo Machado')
-- sculpture
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (8, N'sculpture', N'AkaCorleone')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (9, N'sculpture', N'André Saraiva')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (10, N'sculpture', N'Vhils')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (11, N'sculpture', N'Vitor Reis')
-- textile
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (12, N'textile', N'Claire Benn')
INSERT [dbo].[ItemCategories] ([CategoryId], [Category], [Artist]) VALUES (13, N'textile', N'Maria Sigma')
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
-- ceramics
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (1, N'Turquoise Oval by Nina Malterud', 'Measurements: H;31cm, W;26.5cm Materials: Earthenware Care: Gently Dust', 1, 3, 1200.00, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (2, N'Light and Dark Blue Half Half by Nina Malterud', 'Measurements: H;31cm, W;26.5cm Materials: Earthenware Care: Gently Dust', 1, 3, 1200.00, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (3, N'Maria Kristofersson Tall Lines Cylinder i', 'Material: Terracotta, porcelain slip, glaze Technique: Handbuilt Dimensions: Ø; 18cm, H; 18cm', 1, 3, 550.00, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (4, N'Maria Kristofersson Low Lines Platter', 'By Maria Kristofersson Material: Terracotta, porcelain slip, glaze Technique: Handbuilt Dimensions: Ø; 35.5cm, H; 4cm', 1, 3, 600.00, 2, N'')
-- glass
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (5, N'Edmond Byrne Blown Pale Pink Glass Large Cylinder', 'Materials & Techniques: Blown Glass Dimensions: H;30cm, W;28cm Care: Gentle Hand Wash', 2, 1, 1430.00, 1, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (6, N'Edmond Byrne Blown Glass Vases with China Clay Patina', 'Materials & Techniques: Mould Blown Glass and China Clay Patina Dimensions: ø;8cm, H;25cm Dark Blue ø;8cm, H;29cm Care: Gentle Hand Wash', 2, 3, 215.00, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (7, N'Michéle Oberdieck Blown Glass Heather Round Bowl', 'Techniques: Blown Glass Dimensions: H;20cm, W;20cm, D;12cm Care: Gentle Hand Wash', 2, 1, 915.00, 1, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (8, N'Michéle Oberdieck Blown Glass Amber Topaz Bowl', 'Techniques: Blown Glass Dimensions: H;23cm, W;21cm Care: Gentle Hand Wash', 2, 3, 710.00, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (9, N'Indigo Tall Sake Cup by Celia Dowson', 'Materials: Bullseye Glass Techniques: Kiln cast, hand-worked and polished Dimensions: ø;5cm, H;6.5cm', 2, 3, 165.00, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (10, N'Atmospheres Bowl I Peach to Clear (Mist) by Celia Dowson', 'Materials: Bullseye Glass Techniques: Kiln cast, hand-worked and polished Dimensions: Ø 29cm x H;14cm', 2, 3, 3000.00, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (11, N'White Opal Miniature Vase by Celia Dowson', 'Materials: Bullseye Glass Techniques: Kiln cast, hand-worked and polished Dimensions: ø;5cm, H;11cm', 2, 3, 195.00, 2, N'')
-- painting
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (12, N'New Heights', 'Acrylic paint on 100% cotton paper, natural texture. 29.721cm (11.7*8.3) 1/1 Unique Piece Signed on the front and back by Lou.', 3, 3, 550.00, 1, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (13, N'Lo que tengo cerca | 9 artworks', 'Oil pastels on 100% cotton paper, natural texture. 1/1s, Unique Pieces | Sold as a collection of 9 Size A5 each + Frame Signed on the back by Lou.', 3, 3, 2300.00, 1, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (14, N'Old Man Head Portrait I Senior Age Face (2017)', 'Watercolour on Paper One of a kind artwork Size: 29.7 x 42 x 0.1cm (unframed) Signed on the front Style: Photorealistic Subject: People and portraits', 3, 3, 150.00, 10, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (15, N'Celebrity Albert Einstein Face | Famous Man Head Portrait (2018)', 'Watercolour on Paper One of a kind artwork Size: 29.7 x 42 x 0.1cm (unframed) Signed on the front Style: Expressive and gestural Subject: People and portraits', 3, 3, 135.00, 23, N'')
-- sculpture
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (16, N'Playground', 'Edition of /20 + 5 AP Refractory slurry, slip and matt glaze Signed and numbered by the artist 34 x 24.5 x 15 cm 2018', 4, 3, 220.00, 13, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (17, N'FOLLOW YOUR SENSES', 'Edition of / 7 + 3 AP Laser cut acrylic and coloured transparent vinyl on valchromat base 21.5 x 21.5 x 21.5 cm 2021', 4, 3, 580.00, 0, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (28, N'Mr. A Cube', 'Edition of /200 + 20 AP Engraved pink marble Signed and numbered 7 x 7 x 7 cm 2018 ', 4, 3, 385.00, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (19, N'Shadows', 'Edition of /12 + 3 AP 3D nylon SLS print in glassed wooden frame Signed and numbered by the artist Piece: 22 x 18 x 5 cm Frame: 31 x 28 x 8.8 cm 2016', 4, 3, 2850.00, 0, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (20, N'Prevail', 'Edition of /20 + 5 AP Laser-engraved fragment recovered from a demolished building in Lisbon with Vhils mural (brick, plaster, concrete, and paint) Signed and numbered by the artist on the certificate Various dimensions 2018', 4, 3, 10250.00, 2, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (21, N'Mortar', 'Edition of 20 + 5 AP Cement cast sculpture Engraved signature and numbering 30 x 18 x 15 cm 2020', 4, 3, 2500.00, 2, N'')
-- textile
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (22, N'Bideford Black - the Beginnings of Coal', 'Material: Linen, natural earth pigments bound with soya milk. Technique: Hand stitch with natural fibre thread. Dimensions: W;99cm, L;147cm', 5, 1, 2080.00, 1, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (23, N'Connected', 'Material: Linen, soil and Saharan dust, natural earth pigments bound with soya milk. Technique: Hand stitch with natural fibre thread. Dimensions: W;36cm, L;91cm', 5, 2, 1300.00, 3, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (24, N'Poor Harvest', 'Material: Linen, natural earth pigments bound with soya milk. Technique: Hand stitch with natural fibre thread. Dimensions: W;93cm, L;147cm', 5, 1, 2340.00, 5, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (25, N'Wall Piece II.B', 'Materials: Natural undyed British wool, natural undyed Eri orange Piece silk, natural undyed jute, natural undyed waste sisal Measurements: W;89cm, L;68cm ( +L;20cm tassels) Care: A gentle wash with warm water', 5, 5, 1690.00, 5, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (26, N'Wall Piece I', 'Materials: Natural undyed British wool, natural undyed paper, natural undyed Eri orange Piece silk Techniques: Hand-woven Measurements: W;95cm, L;134cm (+ tassels L;62cm on the bottom + L;87cm braid on the top, in total 283cm) Care: A gentle wash with warm water', 5, 2, 2340.00, 10, N'')
INSERT [dbo].[Items] ([ItemId], [Title], [Description], [CategoryId], [OfferId], [Price], [Quantity], [ImageName]) VALUES (27, N'Sea of Dreams Throw', 'Material: (white cotton edges - longer fringe) , natural undyed British wool, natural linen, recycled cotton Technique: Handwoven Measurements: Approx L 189cm x W 141 cm Care: Dry clean only', 5, 3, 980.00, 1, N'')
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