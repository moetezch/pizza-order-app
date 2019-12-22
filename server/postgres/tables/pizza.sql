BEGIN TRANSACTION;
create table "pizza" ("id" serial primary key, "type" varchar(255), "ingredients" text);
COMMIT;