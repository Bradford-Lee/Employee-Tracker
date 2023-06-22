const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'employees_db'
});

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
        db.query('SELECT * FROM employee', function (err, result, fields) {
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

}

const addRole = () => {

}

const viewDepartments = () => {

}

const addDepartment = () => {

}

startPrompt();