// Import and require mysql2
const express = require('express');
const msysql = require('mysql2');
const inquirer = require("inquirer");
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = msysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'employees_db'
},
console.log(`Connected to the employees_db database.`));

// Create an array of questions for user input
function startPrompt() {
    inquirer.prompt([ 
        {
            type: 'list',
            name: 'questions',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
        },
    ]).then((response) => {
        if (response.questions == 'View All Employees') {
            viewEmployees();
            startPrompt();
        } else if (response.questions == 'Add Employee') {
            addEmployee();
            startPrompt;
        } else if (response.questions == 'Update Employee Role') {
            updateEmployee();
            startPrompt();
        } else if (response.questions == 'View All Roles') {
            viewRoles();
            startPrompt();
        } else if (response.questions == 'Add Role') {
            addRole();
            startPrompt();
        } else if (response.questions == 'View All Departments') {
            viewDepartments();
            startPrompt();
        } else if (response.questions == 'Add Department') {
            addDepartment();
            startPrompt();
        } else if (response.questions == 'Quit') {
            console.log("Goodbye")
        };
    }).catch((err) => console.log(err))
};

const viewEmployees = () => {
    db.connect(function(err) {
        if (err) console.log(err);
        db.query('SELECT * from employee', function (err, result) {
            if (err) console.log(err);
            console.table(result);
        });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name:"last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?"
        }
    ])
}

const updateEmployee = () => {

}

const viewRoles = () => {
  db.connect(function(err) {
    if (err) console.log(err);
    db.query('SELECT * from role', function (err, result) {
        if (err) console.log(err);
        console.table(result);
    });
  });
  startPrompt();
}

const addRole = () => {

}

const viewDepartments = () => {
  db.connect(function(err) {
    if (err) console.log(err);
    db.query('SELECT * FROM department', function (err, result) {
        if (err) console.log(err);
        console.table(result);
    });
  });
  startPrompt();
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is the name of the department?"
    }
  ]).then (res => {
    const department_name = res;
    db.query(`INSERT INTO department (department_name) VALUES('${res.department_name}')`, function (err, result) {
      if (err) console.log(err);
      console.log(`Added ${res.department_name} to departments`);
      startPrompt();
    });
  })
}

startPrompt();