CREATE TABLE "permissions" (
  "id" integer,
  "permissionName" varchar,
  "description" varchar,
  "created_at" timestamp
);

CREATE TABLE "roles" (
  "id" integer,
  "roleName" varchar,
  "read" boolean,
  "write" boolean,
  "delete" boolean,
  "created_at" timestamp
);

CREATE TABLE "rolepermission" (
  "role_id" integer,
  "permission_id" integer
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "firstName" varchar,
  "lastName" varchar,
  "age" integer,
  "email" varchar,
  "password" varchar,
  "token" varchar,
  "permission_id" integer,
  "created_at" timestamp
);

CREATE TABLE "posts" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "description" text,
  "user_id" integer,
  "created_at" timestamp
);

COMMENT ON COLUMN "posts"."description" IS 'Content of the post';

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "permissions" ADD FOREIGN KEY ("id") REFERENCES "users" ("permission_id");

ALTER TABLE "roles" ADD FOREIGN KEY ("id") REFERENCES "rolepermission" ("role_id");

ALTER TABLE "permissions" ADD FOREIGN KEY ("id") REFERENCES "rolepermission" ("permission_id");
