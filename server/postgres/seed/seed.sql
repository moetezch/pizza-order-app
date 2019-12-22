BEGIN TRANSACTION;
insert into "pizza" ("ingredients", "type") values ('tomato, mozzarella, German sausage, oregano, oil', 'viennese'), ('tomato, mozzarella, anchovies, oregano, oi', 'romana'), ('mozzarella, tomato, mushrooms, artichokes, cooked ham, olives, oil', 'capricciosa'), ('tomato sauce, anchovies, olives, capers', 'Napolitana');
insert into "pizza_size" ("size") values ('small'), ('medium'), ('large');
insert into "pizza_price" ("pizza_id", "price", "size_id") values (1, 8, 1), (1, 10.5, 2), (1, 12, 3), (2, 9.5, 1), (2, 11.5, 2), (2, 13, 3), (3, 10, 1), (3, 12, 2), (3, 15, 3), (4, 7.5, 1), (4, 9, 2), (4, 11.5, 3);
COMMIT;