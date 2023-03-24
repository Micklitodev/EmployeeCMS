const db = require('../src/connections')

// ---------- Query Parent class containing Methods that can be extended to all child Classes ----------------

class Query {
  async queryEngine(str) {
    const data = await new Promise((resolve, reject) => {
      db.query(str, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return data;
  }
};

module.exports = Query;
