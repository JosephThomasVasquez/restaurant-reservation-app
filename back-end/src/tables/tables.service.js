const knex = require("../db/connection");

const list = () => {
  return knex("tables").select("*").groupBy("table_id").orderBy("table_name");
};

const listByCapacity = () => {
  return knex("tables").select("*").groupBy("table_id").orderBy("capacity");
};

const create = (table) => {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
};

module.exports = {
  list,
  listByCapacity,
  create,
};
