DROP DATABASE IF EXISTS employeeDB;
-- Create a database called programming_db --
CREATE DATABASE employeeDB;

-- Use programming db for the following statements --
USE employeeDB;

CREATE TABLE department (
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
id INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR(100) NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
id INTEGER AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
id INTEGER AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NOT NULL,
manager_id INT NOT NULL,
PRIMARY KEY (id)
);

