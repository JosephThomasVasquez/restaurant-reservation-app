const knex = require("../db/connection");

const list = () => {
  return knex("reservations")
    .select("*")
    .groupBy("reservation_id")
    .orderBy("reservation_time");
};

const listByDate = (date) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .groupBy("reservation_id")
    .orderBy("reservation_time");
};

const create = (reservation) => {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
};

const read = (reservation_id) => {
  return knex("reservations").select("*").where({ reservation_id }).first();
};

module.exports = {
  list,
  listByDate,
  create,
  read,
};
