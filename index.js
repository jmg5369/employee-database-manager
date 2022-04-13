const inquirer = require("inquirer");

const mysql = require("mysql2");

const cTable = require("console.table");

const util = require("util")

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'edm'
    },
    console.log(`Connected to the edm database.`)
  );

  const query = util.promisify(db.query).bind(db);