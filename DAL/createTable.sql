CREATE TABLE riddles (
    ID int PRIMARY KEY,
    numberAsc int,
    Name varchar(25),
    level varchar(20),
    taskDescription varchar(100),
    correctAnswer varchar(100)
    );

CREATE TABLE players (
    ID int PRIMARY KEY,
    Name varchar(25),
    lowestTime int
    );
