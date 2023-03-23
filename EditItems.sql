SELECT TOP (1000) [ItemId]
      ,[Title]
      ,[Description]
      ,[CategoryId]
      ,[OfferId]
      ,[Price]
      ,[Quantity]
      ,[ImageName]
  FROM [myApp].[dbo].[Items]

--   DELETE FROM dbo.Items WHERE CategoryId = '3';

UPDATE dbo.Items
SET CategoryId='13'
WHERE ItemId='27';
