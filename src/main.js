const inquirer = require("inquirer");
const db = require("./connections");
const cTable = require("console.table");
const figlet = require("figlet");

const queryEngine = require("./query");

// ---------- role ----------------

const viewAllRoles = async () => {
  const data = queryEngine("SELECT * FROM role");
  return data; 
};

const addRole = async () => {
  const depts = await viewAllDepartments();
  const deptsArr = depts.map(
    (element) => (element = `${element.id} - ${element.name}`)
  );

  await inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What Role would you like to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the Role?",
      },
      {
        type: "list",
        name: "department",
        message: "What is the Department for the Role?",
        choices: deptsArr,
      },
    ])
    .then((data) => handleAddRole(data));
};

const handleAddRole = async (input) => {
  const { title, salary, department } = input;

  const index = parseInt(department.split("-")[0].trim(), 10);
  let query = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${index})`;
  queryEngine(query); 
};

// ---------- Department ----------------

const viewAllDepartments = async () => {
  const data = queryEngine("SELECT * FROM department");
  return data;
};

const addDepartment = async () => {
  await inquirer
    .prompt([
      {
        type: "Input",
        message: "What Department Do You Want To Add?",
        name: "depts",
      },
    ])
    .then((data) => handleAddDept(data));
};

const handleAddDept = async (val) => {
  const { depts } = val;
  const query = `INSERT INTO department (name) VALUES ("${depts}")`;
  queryEngine(query);
};

// ---------- Employees ----------------

const viewAllEmployees = async () => {
  queryEngine("SELECT * FROM employee");
};

const addEmployee = async () => {
const role = await viewAllRoles();
const roleArr = role.map((job) => job = `${job.id} - ${job.title}`)
const query = 'SELECT * FROM employee WHERE role_id IN (1, 3, 6, 8)'
const mgmt = await queryEngine(query)
const mgmtArr = mgmt.map((name) => name = `${name.id} - ${name.first_name}${name.last_name}`)


await inquirer 
  .prompt([
    {
      type: 'Input',
      message: 'What Is The Employees First Name?',
      name: 'first'
    },
    {
      type: 'Input',
      message: 'What Is The Employees last Name?',
      name: 'last'
    },
    {
      type: 'list',
      message: 'What Is The Employees Role?',
      name: 'role',
      choices: roleArr
    },
    {
      type: 'list',
      message: 'Who Is Their Manager?',
      name: 'manager',
      choices: [...mgmtArr, 'NULL'] 
    }
  ]).then((name) => handleAddEmployee(name))
}

const handleAddEmployee = async (name) => {
  const {first, last, role, manager} = name; 
  const roleIndex = parseInt(role.split("_")[0].trim(), 10);
  const managerIndex = parseInt(manager.split("-")[0].trim(), 10)
  
  const query = `INSERT INTO employee (first_name, last_name, role_id ${managerIndex ? `, manager_id` : ''}) 
                 VALUES ("${first}", "${last}", ${roleIndex}${managerIndex ? `, ${managerIndex}` : ''})`
  queryEngine(query)
}


// ---------- Initial Prompts ----------------

const initialPrompt = async () => {
  await inquirer.prompt(initialPromptQuestions).then((answers) => {
    console.log("Answer:", answers.initialPrompt);
    const answer = answers.initialPrompt;
    switch (answer) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add Employees":
        addEmployee()
        break;
      case "Update Employee Role":
        console.log("I chose Update Employee Role");
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "Add Role":
        addRole();
        break;
      case "View All Departments":
        viewAllDepartments();
        break;
      case "Add Department":
        addDepartment();
        break;
    }
  });
};
const initialPromptQuestions = [
  {
    type: "list",
    name: "initialPrompt",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employees",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
    ],
  },
];

// ---------- App ----------------

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(
    `====================================================================================`
  );
  console.log(``);
  console.log(``);
  console.log(figlet.textSync("Employee Tracker"));
  console.log(``);
  console.log(``);
  console.log(
    `====================================================================================`
  );
  initialPrompt();
});
