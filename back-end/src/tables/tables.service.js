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

const read = (tableId) => {
  return knex("tables").select("*").where({ table_id: tableId }).first();
};

const update = (table_id, reservation_id) => {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status: "seated" })
    .then(() => {
      return knex("tables")
        .where({ table_id })
        .update({ reservation_id })
        .returning("*");
    });
};

const resetTable = (table_id, reservation_id) => {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status: "finished" })
    .returning("*")
    .then(() => {
      return knex("tables")
        .where({ table_id })
        .update({ reservation_id: null })
        .returning("*");
    });
};

module.exports = {
  list,
  listByCapacity,
  create,
  read,
  update,
  resetTable,
};
