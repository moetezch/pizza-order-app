BEGIN TRANSACTION;
CREATE table "customer" ("id" serial primary key, "name" varchar(255), "address" varchar(255), "city" varchar(255), "zip_code" integer, "phone" varchar(255), "created_at" timestamptz, "updated_at" timestamptz);
COMMIT;