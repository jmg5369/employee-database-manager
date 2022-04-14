const inquirer = require("inquirer");

const mysql = require("mysql2");

const cTable = require("console.table");

const util = require("util");
const { allowedNodeEnvironmentFlags } = require("process");
const { ADDRGETNETWORKPARAMS } = require("dns");

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

  function init () {
    inquirer.prompt(
      [
        {
          type: "list", 
          name: "choice",
          message: "What would you like to do next?",
          choices: [
            "See all Departments", "See all Roles", "See all Employees", "Add a department", "Add Role", "Add new Employee", "Update an Employee", "Exit Application", 
          ]
        }
      ]
    ).then((response) => {
      if (response.choice === "See all Departments") {
        getAllDepartments()
      }else if(response.choice === "See all Roles") {
        getAllRoles()
      }else if(response.choice === "See all Employees"){
        getAllEmployees()
      }else if(response.choice === "Add a department") {
        addDepartment()
      }else if(response.choice === "Add Role") {
        addRole()
      }else if(response.choice === "Add new Employee") {
        addEmployee()
      }else if(response.choice === "Update an Employee") {
        updateEmployee()
      }else if (response.choice === "Exit Application") {
        exitApplication()
      }
    })
  }

async function getAllDepartments() {
  let data = await query("SELECT * FROM department;");
  let table = cTable.getTable(data)
  console.log(table)
init()

}
async function getAllRoles() {
  let data = await query("SELECT * FROM role;");
  let table = cTable.getTable(data)
  console.log(table)
init()

}
async function getAllEmployees() {
  let data = await query("SELECT * FROM employee;");
  let table = cTable.getTable(data)
  console.log(table)
init()

}










  init()