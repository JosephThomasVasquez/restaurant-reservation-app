const knex = require("../db/connection");

// Gets all tables and sorts by table_name
const list = () => {
  return knex("tables").select("*").groupBy("table_id").orderBy("table_name");
};

// Gets all tables and sorts by capacity
const listByCapacity = () => {
  return knex("tables").select("*").groupBy("table_id").orderBy("capacity");
};

// Creates a new table record
const create = (table) => {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
};

// Gets table data by table_id
const read = (tableId) => {
  return knex("tables").select("*").where({ table_id: tableId }).first();
};

// Updates the reservation status to "seated" and adds the reservation_id to table.reservation_id
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

// Updates the reservation status to "finished" and sets the table.reservation_id back to null.
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
