DROP DATABASE IF EXISTS dawon;

CREATE DATABASE dawon;
USE dawon;

CREATE TABLE Users(
    ID VARCHAR(100),
    PW VARCHAR(100),
    Gr VARCHAR(100)
);

CREATE TABLE Process(
    Pnum int(100),
    Gr VARCHAR(100),
    Flag int,
    Cate VARCHAR(100),
    Addr VARCHAR(100)
);

CREATE TABLE Product(
    Cnt int,
    Pnum int(100),
    Gr VARCHAR(100),
    Addr VARCHAR(100),
    CheckP VARCHAR(100)
);
