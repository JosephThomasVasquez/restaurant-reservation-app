const knex = require("../db/connection");

const list = () => {
  return knex("reservations")
    .select("*")
    .groupBy("reservation_id")
    .orderBy("reservation_time");
};

const listByDate = (reservation_date) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .groupBy("reservation_id")
    .orderBy("reservation_time");
};

const searchByPhone = (mobile_number) => {
  return knex("reservations")
    .select("*")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_date");
};

const create = (reservation) => {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
};

const update = (updatedReservation) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
};

const read = (reservation_id) => {
  return knex("reservations").select("*").where({ reservation_id }).first();
};

const updateStatus = (reservation_id, status) => {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status })
    .then(() => read(reservation_id)); // Run the knex read query to return the data from reservation_id
};

module.exports = {
  list,
  listByDate,
  create,
  update,
  read,
  updateStatus,
  searchByPhone,
};
