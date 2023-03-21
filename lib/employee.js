const inquirer = require("inquirer");
const Query = require("./query");

class Employee extends Query {
  async view() {
    const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name
    AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id;    
    `;
    return this.queryEngine(query);
  }

  async add() {
    const roleQuery = `SELECT * FROM role`
    const role = await this.queryEngine(roleQuery);
    const roleArr = role.map((job) => (job = `${job.id} - ${job.title}`));

    const mgmtQuery = "SELECT * FROM employee WHERE role_id IN (1, 3, 6, 8)";
    const mgmt = await this.queryEngine(mgmtQuery);
    const mgmtArr = mgmt.map(
      (name) => (name = `${name.id} - ${name.first_name}${name.last_name}`)
    );

    await inquirer
      .prompt([
        {
          type: "Input",
          message: "What Is The Employees First Name?",
          name: "first",
        },
        {
          type: "Input",
          message: "What Is The Employees last Name?",
          name: "last",
        },
        {
          type: "list",
          message: "What Is The Employees Role?",
          name: "role",
          choices: roleArr,
        },
        {
          type: "list",
          message: "Who Is Their Manager?",
          name: "manager",
          choices: [...mgmtArr, "NULL"],
        },
      ])
      .then((name) => this.handleAdd(name));
  }

  async handleAdd(name) {
    const { first, last, role, manager } = name;
    const roleIndex = parseInt(role.split("_")[0].trim(), 10);
    const managerIndex = parseInt(manager.split("-")[0].trim(), 10);

    const query = `INSERT INTO employee (first_name, last_name, role_id ${
      managerIndex ? `, manager_id` : ""
    }) 
                   VALUES ("${first}", "${last}", ${roleIndex}${
      managerIndex ? `, ${managerIndex}` : ""
    })`;
    return this.queryEngine(query);
  }

  async update() {
    return console.log('Update')
  }
  
}

module.exports = Employee;
