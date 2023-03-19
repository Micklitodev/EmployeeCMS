const db = require("./connections");

const queryEngine = async (str) => {
  const data = await new Promise((resolve, reject) => {
    db.query(str, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  console.log("\n");
  console.table(data);
  return data;
};  
module.exports = queryEngine;
