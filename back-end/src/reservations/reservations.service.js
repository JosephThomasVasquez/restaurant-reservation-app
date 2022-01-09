const knex = require("../db/connection");

const list = (date) => {
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

module.exports = {
  list,
  create,
};
