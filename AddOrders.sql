SELECT * FROM Carts;
SELECT * FROM CartItems;
INSERT INTO CartItems (CartId, ItemId) 
VALUES (1, 11)

-- Insert a previous order to our first customer
UPDATE CartItems SET CartId = 2 WHERE CartItemId = 8

-- Validate Order
INSERT INTO Carts (UserId, Ordered, OrderedOn) 
VALUES (1, 'true','')

-- Update Ordered Date
UPDATE Carts SET OrderedOn = CONVERT(varchar(12), GETUTCDATE(), 107) WHERE CardId = 2

UPDATE Carts SET OrderedOn = '' WHERE CartId = 1

-- UPDATE Carts SET Ordered = 'true', Ordered = (SELECT OrderedOn FROM Carts WHERE CartId=4)