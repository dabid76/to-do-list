CREATE TABLE "to-do-list" (
"id" serial primary key,
"task" varchar (250) not null,
"complete" boolean DEFAULT false
);

INSERT INTO "to-do-list" ("task")
VALUES ('create database');