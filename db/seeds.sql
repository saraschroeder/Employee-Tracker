INSERT INTO department (name) VALUES
('IT'),
('Marketing'),
("Engineering"),
('Finance'),
('Human Resources');


INSERT INTO roles (title, salary, department_id) VALUES
('Software Developer', 90000, 1),
('Network Administrator', 70000, 1),
('Director of Marketing', 80000, 2),
('Marketing Specialist', 60000, 2),
('Engineer', 70000, 3),
('Lead Engineer', 100000, 3),
('Finance Manager', 90000, 4),
('Accountant', 65000, 4),
('HR Coordinator', 70000, 5),
('HR Assistant', 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, 2),
('Sara', 'Schroeder', 2, null),
('Madison', 'Jung', 3, 4),
('Kayla', 'Ende', 4, null),
('Sam', 'Schroeder', 5, 6),