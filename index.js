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
  console.log("\n")
  console.log(table)
init()

}
async function getAllRoles() {
  let data = await query("SELECT * FROM role;");
  let table = cTable.getTable(data)
  console.log("\n")
  console.log(table)
init()

}
async function getAllEmployees() {
  let data = await query("SELECT * FROM employee;");
  let table = cTable.getTable(data)
  console.log("\n")
  console.log(table)
init()

}
async function addDepartment() {

    inquirer.prompt(
      [
        {
          type: "input", 
          name: "departmentName",
          message: "What is the name of the new department?",
          
        }
      ]
    ).then((response) => {
     insertDepartment(response)
    })
}

async function insertDepartment(response) {
  let data = await query(`INSERT INTO department (name) VALUES (?);`,[response.departmentName])
getAllDepartments()

  init()
}

async function addRole() {

  inquirer.prompt(
    [
      {
        type: "input", 
        name: "roleName",
        message: "What is the name of the new role?",
        
      },
      {
        type: "input", 
        name: "roleSalary",
        message: "What is the salary of the new role?",
        
      },
      {
        type: "input", 
        name: "deptID",
        message: "What is the department ID of the new role?",
        
      }
    ]
  ).then((response) => {
   insertRole(response)
  })
}

async function insertRole(response) {
let data = await query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`,[response.roleName, response.roleSalary, response.deptID])
getAllRoles()

init()
}

async function addEmployee() {

  inquirer.prompt(
    [
      {
        type: "input", 
        name: "employeeFirst",
        message: "What is the first name of the new employee?",
        
      },
      {
        type: "input", 
        name: "employeeLast",
        message: "What is the last name of the new employee?",
        
      },
      {
        type: "input", 
        name: "roleID",
        message: "What is the role ID that this employee belongs to?",
        
      },
      {
        type: "input", 
        name: "manager",
        message: "Who is the manager of the new employee? Enter the managers ID here.",
        
      }
    ]
  ).then((response) => {
   insertEmployee(response)
  })
}

async function insertEmployee(response) {
let data = await query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`,[response.employeeFirst, response.employeeLast, response.roleID, response.manager])
getAllEmployees()

init()
}

async function updateEmployee() {

  inquirer.prompt(
    [
      {
        type: "input", 
        name: "employee",
        message: "What employee would you like to update? Enter their employee ID here:",
        
      },
      {
        type: "input", 
        name: "newRole",
        message: "What is the new role for the employee? Enter the role ID here:",
        
      },
    ]
  ).then((response) => {
   updateRole(response)
  })
}

async function updateRole(response) {
  let data = await query(`UPDATE employee SET role_id = ? WHERE id = ?;`,[response.newRole, response.employee,])
  getAllEmployees()
  
  init()
  }

  init()