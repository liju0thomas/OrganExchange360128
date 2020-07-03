CREATE DATABASE "organ_donor";

CREATE TABLE hospitals
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(500) NOT NULL
);

INSERT INTO
    hospitals
    (username, password, name, address)
VALUES
    (
        'adminABC',
        'adminABC',
        'ABC Hospital',
        'ABC Nagar - 123456'
    );

INSERT INTO
    hospitals
    (username, password, name, address)
VALUES
    (
        'kims',
        'kimsABC',
        'Kims Hospital',
        'Kims Nagar - 123456'
    );

CREATE TABLE donors
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(500) NOT NULL,
    blood VARCHAR(3) NOT NULL,
    hla VARCHAR(20) NOT NULL,
    hospitalId INT NOT NULL,
    status BOOLEAN DEFAULT false
);

CREATE TABLE acceptors
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(500) NOT NULL,
    blood VARCHAR(3) NOT NULL,
    hla VARCHAR(20) NOT NULL,
    hospitalId INT NOT NULL,
    pairOf INT REFERENCES donors(id),
    donorId INT DEFAULT NULL
);

CREATE TABLE acceptorhosp
(
    id1 INT,
    name VARCHAR(100) NOT NULL,
    blood VARCHAR(3) NOT NULL,
    hla VARCHAR(20) NOT NULL,
    status BOOLEAN, 
    hospitalId INT NOT NULL
);

CREATE TABLE donorhosp
(
    id2 INT,
    name VARCHAR(100) NOT NULL,
    blood VARCHAR(3) NOT NULL,
    hla VARCHAR(20) NOT NULL,
    pairOf INT 
);

CREATE TABLE pairhosp
(
    id1 INT,
    accname VARCHAR(100) NOT NULL,
    donorname VARCHAR(100) NOT NULL,
    status BOOLEAN,
    hospitalId INT NOT NULL
     
);
CREATE TABLE pairhosp11
(
    id1 INT,
    accname VARCHAR(100) NOT NULL,
    donorname VARCHAR(100) NOT NULL,
    desthosp VARCHAR(100),
    status BOOLEAN,
    hospitalId INT NOT NULL,
    donoremail varchar(40),
    acceptoremail varchar(40)
     
);


 