BEGIN TRANSACTION;
create table "pizza_price" ("id" serial primary key, "pizza_id" integer, "size_id" integer, "price" decimal(4, 2)); alter table "pizza_price" add constraint "pizza_price_pizza_id_foreign" foreign key ("pizza_id") references "pizza" ("id"); alter table "pizza_price" add constraint "pizza_price_size_id_foreign" foreign key ("size_id") references "pizza_size" ("id");
COMMIT;