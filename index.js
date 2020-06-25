var mysql = require("mysql");
var inquirer = require("inquirer");
const path = require('path');
const { allowedNodeEnvironmentFlags } = require("process");
// const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "dean123",
    database: "employeeDB"
});
// // array of questions for user
// * Add departments, roles, employees
//   * View departments, roles, employees
//   * Update employee roles
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
});
function askQuestions() {
    inquirer
        .prompt({
            type: "list",
            message: "What would you like to do?",
            name: "choices",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Role",
                "Add Employee",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.choices) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View All Employees By Department":
                    viewByDept();
                    break;
                case "View All Employees By Role":
                    viewByRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRoles();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        });
};
//view all employees in database
//need to join with other tables
function viewEmployees() {
    connection.query("SELECT first_name, last_name, department.name, role.title, role.salary FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.log("\n All employees retrieved from database. \n");
        console.table(res);
        askQuestions();
    });
};
//view all employees in database by department
//need to join with other tables
function viewByDept() {
    connection.query("SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.log("\n All employees retrieved from database by department. \n");
        console.table(res);
        askQuestions();
    });
};
//view all employees in database by role
//need to join with other tables
function viewByRole() {
    connection.query("SELECT first_name, last_name, role.title FROM((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);", function (err, res) {
        if (err) throw err;
        console.log("\n All employees retrieved from database by role. \n");
        console.table(res);
        askQuestions();
    });
};
//Add employee function in progess.
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee's first name:",
                name: "firstname"
            },
            {
                type: "input",
                message: "Enter employee's last name:",
                name: "lastname"
            },
            {
                type: "input",
                message: "Enter employee's role id:",
                name: "roleid"
            },
            {
                type: "input",
                message: "Enter employee's manager id:",
                name: "managerid"
            },
        ])
        .then(function (answer) {
            if (answer.firstname === '' || answer.lastname === '' || answer.roleid === '' || answer.managerid === '') {
                console.log("Enter a response for all fields or go back to main menu.");
                inquirer
                .prompt({
                    type: "list",
                    message: "Enter a response for all fields or go back to main menu.",
                    name: "choices",
                    choices: [
                        "Add Employee",
                        "Main Menu"
                    ]
                })
                .then (function (res)   {
                    if (res.choices === "Add Employee")    {
                        addEmployee();
                    }   else    {
                        askQuestions();
                    }
                })
                
            } else {
                connection.query("INSERT INTO employee SET ?",
                    { first_name: answer.firstname, last_name: answer.lastname, role_id: answer.roleid, manager_id: answer.managerid }, function (err, res) {
                        if (err) throw err;
                        console.log("\n Database with added employee. \n");
                        viewEmployees();
                    })
            } 
        })
}

function addRole() {
    inquirer
        .prompt([
        {
            type: "input",
            message: "Enter the employee title",
            name: "title"
        },
        {
            type: "input",
            message: "Enter the employee salary",
            name: "salary"
        },
        {
            type: "input",
            message: "Enter the employee department id",
            name: "department_id"
        }
    ])
    .then(function (res){
        connection.query(
            "INSERT INTO role SET ?", {
                title: res.title,
                salary: res.salary,
                department_id: res.department_id
            },
            function (err, res) {
                if (err) {
                    throw err;
                }
                console.table(res);
            }
        );
        start();
    })








function updateRole() {
    let allemp = [];
    connection.query("SELECT * FROM employee", function(err, answer) {
      // console.log(answer);
      for (let i = 0; i < answer.length; i++) {
        let employeeString =
          answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
        allemp.push(employeeString);
      }
      // console.log(allemp)
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "updateEmpRole",
            message: "select employee to update role",
            choices: allemp
          },
          {
            type: "list",
            message: "select new role",
            choices: ["Manager", "Bartender", "Server", "Host", "Chef"],
            name: "newrole"
          }
        ])
        .then(function(answer) {
          console.log("about to update", answer);
          const idToUpdate = {};
          idToUpdate.employeeId = parseInt(answer.updateEmpRole.split(" ")[0]);
          switch (answer.choices) {
            case "Manager":
                idToUpdate.role_id = 1;
                break;
            case "Bartender":
                idToUpdate.role_id = 2;
                break;
            case "Server":
                idToUpdate.role_id = 3;
                break;
            case "Host":
                idToUpdate.role_id = 4;
                break;
            case "Chef":
                idToUpdate.role_id = 5;
                break;
          }
        //   if (answer.newrole === "manager") {
        //     idToUpdate.role_id = 1;
        //   } else if (answer.newrole === "employee") {
        //     idToUpdate.role_id = 2;
        //   }

          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [idToUpdate.role_id, idToUpdate.employeeId],
            function(err, answer) {
              viewEmployees();
            }
          );
        });
    });
  }