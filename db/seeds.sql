INSERT INTO department (name)
VALUES
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salart, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 1000, 2),
('Financial Analyst', 150000, 2), 
('Marketing Coordinator', 700000, 3),
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Johnson', 2, null),
('David', 'Anderson', 1, 1),
('Julie', 'Cam', 4, null),
('Ashley', 'Jones', 3, 3),
('Taylor', 'Ray', 6, null),
('Kayla', 'Brown', 5, 5),
('Maddy', 'Moore', 7, null),
('Sara', 'Wubben', 8, 7);