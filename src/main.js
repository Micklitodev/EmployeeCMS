const inquirer = require("inquirer");
const db = require("./connections");

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
  const deptsArr = data.map((element) => element.name);
  return deptsArr;
};


const departments = async () => {
  const choicesArr = await getDepartments()
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which Department?",
        name: "depts",
        choices: choicesArr,
      },
    ])
    .then((data) => {
      console.log(data);
    });
};

departments()
