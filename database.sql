CREATE TABLE "to-do-list" (
"id" serial primary key,
"task" varchar (250) not null,
"complete" varchar(20)
);

INSERT INTO "to-do-list" ("task")
VALUES ('create database');