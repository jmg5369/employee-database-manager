DROP DATABASE IF EXISTS edm;

CREATE DATABASE IF NOT EXISTS edm;

USE edm;


CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(8, 2),
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

