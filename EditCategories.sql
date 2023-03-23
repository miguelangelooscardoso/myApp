SELECT TOP (1000) [CategoryId]
      ,[Category]
      ,[Artist]
  FROM [myApp].[dbo].[ItemCategories]

DELETE FROM dbo.ItemCategories WHERE CategoryId = '9';