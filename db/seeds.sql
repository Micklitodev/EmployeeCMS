INSERT INTO department (id, name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 110000, 1),
       (2, "Salesperson", 80000, 1),
       (3, "Engineering Manager", 180000, 2),
       (4, "Software Engineer", 150000, 2),
       (5, "Data Analyst", 100000, 2),
       (6, "Account Manager", 120000, 3),
       (7, "Accountant", 100000, 3),
       (8, "Legal Team Lead", 170000, 4),
       (9, "Lawyer", 120000, 4);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Eric", "Cartman", 6, NULL),
       (5, "Kenny", "McCormick", 7, 1),
       (8, "Stan", "Marsh", 1, NULL),
       (9, "Kyle", "Bravlowski", 4, 5),
       (16, "Randy", "Marsh", 9, 8),
       (17, "Leopold", "Stotch", 6, NULL);