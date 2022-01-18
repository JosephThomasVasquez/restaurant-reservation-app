const tables = require("./tables.json");

// {
//   "table_name": "Booth #1",
//   "capacity": 8
// },
// {
//   "table_name": "Booth #2",
//   "capacity": 8
// }

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(() => knex("tables").insert(tables));
};
