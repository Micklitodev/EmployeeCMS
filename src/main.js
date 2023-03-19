const inquirer = require("inquirer");
const db = require("./connections");
const cTable = require("console.table");
const figlet = require("figlet");

const getDepartments = async () => {
  const data = await new Promise((resolve, reject) => {
    db.query("SELECT * FROM department", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  console.log("");
  console.log("\x1b[33m ALL DEPARTMENTS \x1b[0m");
  console.log("");
  console.table(data);
  initialPrompt();
  // const deptsArr = data.map((element) => element.name);
  // return deptsArr;
  // console.table(tableData);
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
}



const handleAddDept = async (val) => {
  
  const { depts } = val;
  const query = `INSERT INTO department (name) VALUES ("${depts}")`


  const data = await new Promise((resolve, reject) => {
    db.query(
      query,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });

  console.table([data]);
  initialPrompt();
};

const viewAllEmployees = async () => {
  const data = await new Promise((resolve, reject) => {
    db.query("SELECT * FROM employee", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  console.log("");
  console.log("\x1b[33m ALL EMPLOYEES \x1b[0m");
  console.log("");
  console.table(data);
  initialPrompt();
};

const viewAllRoles = async () => {
  const data = await new Promise((resolve, reject) => {
    db.query("SELECT * FROM role", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  console.log("");
  console.log("\x1b[33m ALL ROLES \x1b[0m");
  console.log("");
  console.table(data);
  initialPrompt();
};

// const departments = async () => {
//   const choicesArr = await getDepartments()
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         message: "Which Department?",
//         name: "depts",
//         choices: choicesArr,
//       },
//     ])
//     .then((data) => {
//      console.table(data)
//     });
// };

// Connect to MySQL and title
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
const initialPrompt = async () => {
  await inquirer.prompt(initialPromptQuestions).then((answers) => {
    console.log("Answer:", answers.initialPrompt);
    const answer = answers.initialPrompt;
    switch (answer) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add Employees":
        console.log("I chose add employees");
        break;
      case "Update Employee Role":
        console.log("I chose Update Employee Role");
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "Add Role":
        console.log("I chose Add Role");
        break;
      case "View All Departments":
        getDepartments();
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
      "Add Department"
    ],
  },
];
