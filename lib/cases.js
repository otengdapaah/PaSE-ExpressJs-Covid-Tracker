const csv = require("fast-csv");
const request = require("request");
const moment = require("moment");

function getCases(url, countries, Case) {
  const cases = [];

  csv
    .parseStream(request(url))
    .on("data", (row) => {
      if (countries.includes(row[3])) {
        cases.push({
          Country: row[3],
          Confirmed: row[7],
          Active: row[10],
          Recoveries: row[9],
          Deaths: row[8],
          UpdatedOn: moment(row[4]).format("DD-MM-YYYY"),
        });
      }
    })
    .on("end", () => {
      console.log("File read successfully....");
      Case.insertMany(cases, (err, docs) => {
        if (err) {
          console.log(err);
        }
      });
    });
}

module.exports = getCases;
