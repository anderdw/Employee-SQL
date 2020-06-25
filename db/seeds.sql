USE employeeDB;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Finance");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 90000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 75000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 60000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Team Lead", 90000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 75000, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Account Manager", 180000, 7);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 100000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Chan", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ashley", "Rodriguez", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Tupik", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Malia", "Brown", 5, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Lourd", 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tom", "Allen", 7, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Brown", 8, 7);
