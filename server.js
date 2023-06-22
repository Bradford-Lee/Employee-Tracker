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
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'mysql',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );