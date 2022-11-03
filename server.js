// Dependencies
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');



// Express middleware
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'company_db'
    },
    console.log(`Connected to the company database.`)
);

function start(){
    inquirer.prompt({
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee roles',
            'View ALl roless',
            'Add roles',
            'View All Departments',
            'Add Department',
            'Quit',
        ],
    }).then(function(answer){
        const response = answer.start

        
        if (response == 'View All Employees'){
            viewAllEmployees();
        } 
        else if (response == 'Add Employee'){
            addEmployee();
        }
        else if (response == 'Update Employee roles'){
            updateEmployeeroles();
        }
        else if (response == 'View ALl roless'){
            viewAllroles();
        }
        else if (response == 'Add roles'){
            addroles();
        }
        else if (response == 'View All Departments'){
            viewAllDepartments();
        } 
        else if (response == 'Add Department'){
            addDepartment();
        } else if (!response || response == "Quit"){
            console.log("Come again :)")
            db.end();
        }
    })
}

function viewAllEmployees(){
    console.log("Viewing All Employees");
    db.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee;', (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
}

function addEmployee(){
    console.log("Adding Employee");
}

function updateEmployeeroles(){
    console.log("Updating Employee role");
}

function viewAllroles(){
    console.log("Viewing All roles");
    db.query('SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles JOIN department ON department_id = department.id', function (err, results) {
        if (err) throw err;
        console.table(results)
        start();
    });
}

function addroles(){
    console.log("Adding roles");
}

function viewAllDepartments(){
    console.log("Viewing All Departments");
    db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
}

function addDepartment(){
    console.log("Adding Department");
}


start()
