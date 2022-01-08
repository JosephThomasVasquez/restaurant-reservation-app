const knex = require("../db/connection");

const list = () => {
  return knex("reservations").select("*");
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
