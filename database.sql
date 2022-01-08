CREATE TABLE "to-do" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(255) NOT NULL,
	"notes" VARCHAR(255),
	"complete" BOOLEAN DEFAULT FALSE
	);
	
INSERT INTO "to-do"
("task", "notes")
VALUES
('Garbage', 'Take the garbage out'),
('Dishes', 'Clean the dishes'),
('Dishwasher', 'Empty the dishwasher and put dirty dishes in'),
('Main Bathroom', 'Clean the main floor bathroom');