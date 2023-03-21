const inquirer = require('inquirer')
const Query = require("./query");

class Role extends Query {
  async view() {
    const data = `SELECT * FROM role`;
    return this.queryEngine(data);
  }

  async add() {
    const deptQuery = `SELECT * FROM department`
    const depts = await this.queryEngine(deptQuery)
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
      .then((data) => this.handleAdd(data));
  }

  async handleAdd(input) {
    const { title, salary, department } = input;

    const index = parseInt(department.split("-")[0].trim(), 10);
    let query = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${salary}, ${index})`;
    return this.queryEngine(query);
  }
}

module.exports = Role;
