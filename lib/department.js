const inquirer = require('inquirer')
const Query = require('./query')

class Department extends Query {
  async view() {
    const data = `SELECT * FROM department`;
    return this.queryEngine(data);
  }

  async add() {
    await inquirer
      .prompt([
        {
          type: "Input",
          message: "What Department Do You Want To Add?",
          name: "depts",
        },
      ])
      .then((data) => this.handleAdd(data));
  }
  async handleAdd(val) {
    const { depts } = val;
    const query = `INSERT INTO department (name) VALUES ("${depts}")`;
    return this.queryEngine(query);
  }
}

module.exports = Department;
