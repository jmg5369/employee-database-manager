USE edm;

INSERT INTO department (name)
VALUES ("Engineering"), ("Software Development"), ("Logistics");

INSERT INTO role (title, salary, department_id)
VALUES ("Mechanical Engineer", 90000.00, 1),
("Senior Developer", 150000.00, 2),
("Jr. Developer", 70000.00, 2),
("Head of HR", 80000.00, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Max", "Gorodesky", 3), 
("Trayce", "Wilhelm", 2),
("Damien", "Luzzo", 1),
("Darcy", "Brown", 4);

UPDATE employee 
SET manager_id = 2
WHERE first_name = "Max";


