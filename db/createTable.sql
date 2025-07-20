CREATE TABLE riddles (
    ID int PRIMARY KEY,
    numberAsc int,
    Name varchar(25),
    level varchar(20),
    taskDescription varchar(100),
    correctAnswer varchar(100)
);

CREATE TABLE players (
    ID SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    best_time INT DEFAULT 0
);
