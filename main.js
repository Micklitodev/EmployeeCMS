const inquirer = require("inquirer");
const db = require("./src/connections");
const cTable = require("console.table");
const figlet = require("figlet");

const Department = require('./lib/department')
const Role = require('./lib/role')
const Employee = require('./lib/employee')

const RoleObj = new Role();
const DeptObj = new Department();
const EmpObj = new Employee()

// ---------- App ----------------

const initialPrompt = async () => {
  await inquirer.prompt(initialPromptQuestions).then((answers) => {
    console.log("Answer:", answers.initialPrompt);
    const answer = answers.initialPrompt;
    switch (answer) {
      case "View All Employees":
        EmpObj.view()
        break;
      case "Add Employees":
        EmpObj.add()
        break;
      case "Update Employee Role":
        EmpObj.update()
        break;
      case "View All Roles":
        RoleObj.view()
        break;
      case "Add Role":
        RoleObj.add()
        break;
      case "View All Departments":
        DeptObj.view()
        break;
      case "Add Department":
        DeptObj.add()

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
