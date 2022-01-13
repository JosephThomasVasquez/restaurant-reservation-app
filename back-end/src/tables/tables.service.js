const knex = require("../db/connection");

const list = () => {
  return knex("tables").select("*");
};

const create = (table) => {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
};

module.exports = {
  list,
  create,
};
