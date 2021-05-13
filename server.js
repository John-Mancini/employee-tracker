//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const connection = require("./db/connection.js");

//this connects to connection.js by importing the connection and then attempts to connect
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as Id" + connection.threadId);
  menu();
});

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select an option:",
        name: "choice",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Update Employee",
          "Add Employee",
          "Add Role",
          "Add Department",
        ],
      },
    ])
    .then(function (answers) {
      if (answers.choice == "View All Employees") {
        viewAllEmployees();
      } else if (answers.choice == "View All Departments") {
        viewAllDepartments();
      } else if (answers.choice == "View All Roles") {
        viewAllRoles();
      } else if (answers.choice == "Add Employee") {
        addEmployee();
      } else if (answers.choice == "Add Role") {
        addRole();
      } else if (answers.choice == "Add Department") {
        addDepartment();
      } else if (answers.choice == "Update Employee") {
        updateEmployee();
      }
    });
}
// veiw all employees
function viewAllEmployees() {
  connection.query("SELECT * from employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

function viewAllDepartments() {
  connection.query("SELECT * from department", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}
function viewAllRoles() {
  connection.query("SELECT * from role", function (err, res) {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the First Name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the Last Name",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the Role ID",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the Manager ID",
      },
    ])
    .then(function (answers) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          // id INT AUTO_INCREMENT PRIMARY KEY,
          // first_name VARCHAR(30) NOT NULL,
          // last_name VARCHAR(30) NOT NULL,
          // role_id INT NOT NULL,
          // FOREIGN KEY (role_id) REFERENCES role(id),
          // manager_id INT NOT NULL,
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          menu();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department will be added?",
      },
    ])
    .then(function (answers) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answers.name,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          menu();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the job Title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the starting Salary",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the Department ID",
      },
    ])
    .then(function (answers) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department_id,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          menu();
        }
      );
    });
}
function updateEmployee() {
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "input",
        message: "What is the Employee ID?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the New Role ID",
      },
    ])
    .then(function (answers) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answers.role_id, answers.employee_id],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          menu();
        }
      );
    });
}
