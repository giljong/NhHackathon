DROP DATABASE IF EXISTS dawon;

CREATE DATABASE dawon;
USE dawon;

CREATE TABLE Users(
    ID varchar(100),
    PW varchar(100),
    Gname varchar(100)
);

CREATE TABLE Process(
    Pnum varchar(100),
    Group varchar(100),
    Flag INT,
    Cate varchar(100),
    Detail varchar(100)
);

CREATE TABLE Product(
    Cnt INT,
    Pnum varchar(100),
    Group varchar(100),
    Addr varchar(100)
);
