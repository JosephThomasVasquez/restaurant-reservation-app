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

const update = (tableId, reservationId) => {
  return knex.transaction(async (trx) => {
    await knex("reservations")
      .where({ reservation_id: reservationId })
      .update({ status: "seated" })
      .transacting(trx);

    await knex("tables")
      .where({ table_id: tableId })
      .update({ reservation_id: reservationId })
      .returning("*")
      .transacting(trx);
  });
};

module.exports = {
  list,
  listByCapacity,
  create,
  read,
  update,
};
