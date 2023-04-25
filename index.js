const inquirer = require("inquirer");
const connection = require("./db/connection");
const consoleTable = require("console.table");


function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewAllDepartments() {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.log("\n");
    console.table((results));
    promptUser();
  });
}

function viewAllRoles() {
  connection.query(
    "SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles JOIN department ON roles.department_id = department.id",
    (err, results) => {
      if (err) throw err;
      console.table(results);
      promptUser();
    }
  );
}


function viewAllEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, roles.title AS job_title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id",
    (err, results) => {
      if (err) throw err;
      console.table(results);
      promptUser();
    }
  );
}


function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.name },
        (err) => {
          if (err) throw err;
          console.log(`Department '${answer.name}' added successfully!`);
          promptUser();
        }
      );
    });
}

function addRole() {
  connection.query("SELECT * FROM department", (err, departments) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary of the role:",
        },
        {
          type: "list",
          name: "department",
          message: "Select the department of the role:",
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department,
          },
          (err) => {
            if (err) throw err;
            console.log(`Role '${answer.title}' added successfully!`);
            promptUser();
          }
        );
      });
  });
}

function addEmployee() {
  connection.query("SELECT * FROM roles", (err, roles) => {
    if (err) throw err;
    connection.query("SELECT * FROM employee", (err, managers) => {
      if (err) throw err;
      console.table(roles);
      console.table(managers);

      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roles.map((role) => role.title),
          },
          {
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managers.map(
              (manager) => `${manager.first_name} ${manager.last_name}`
            ),
          },
        ])
        .then((answer) => {
          const role = roles.find((role) => role.title === answer.roleId);
          const manager = managers.find(
            (manager) =>
              `${manager.first_name} ${manager.last_name}` === answer.managerId
          );
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: role.id,
              manager_id: manager.id,
            },
            (err, res) => {
              if (err) throw err;
              console.log(`\n Employee added!\n`);
              promptUser();
            }
          );
        });
    });
  });
}


function updateEmployeeRole() {
  connection.query("SELECT * FROM employee", (err, employees) => {
    if (err) throw err;
    connection.query("SELECT * FROM roles", (err, roles) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
          {
            type: "list",
            name: "role",
            message: "What is the employee's new role?",
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id,
            })),
          },
        ])
        .then((answer) => {
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [answer.role, answer.employee],
            (err) => {
              if (err) throw err;
              console.log("Employee role updated successfully!");
              promptUser();
            }
          );
        });
    });
  });
}


promptUser();