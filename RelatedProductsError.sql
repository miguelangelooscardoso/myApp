-- This is why Related Products are not appearing
SELECT * FROM Items where CategoryId = '9';

-- Playground CategoryId = 11
-- FOLLOW Your SENSES CategoryId = 8
-- Mr. A Cube CategoryId = 9

UPDATE Items
SET CategoryId = '11'
WHERE ItemId = 16;