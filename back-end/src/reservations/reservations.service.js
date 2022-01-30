const knex = require("../db/connection");

// Gets all reservations and sorts by reservation_time
const list = () => {
  return knex("reservations")
    .select("*")
    .groupBy("reservation_id")
    .orderBy("reservation_time");
};

// Gets all reservations by date that do not have status "finished" or "cancelled" and sorts by reservation_time
const listByDate = (reservation_date) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .groupBy("reservation_id")
    .orderBy("reservation_time");
};

// Gets all reservations matching from partial mobile_number from the input and that do not have status "cancelled"
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

// Creates a new reservation record
const create = (reservation) => {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
};

// Updates the reservation
const update = (updatedReservation) => {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
};

// Gets the reservation data by reservation_id
const read = (reservation_id) => {
  return knex("reservations").select("*").where({ reservation_id }).first();
};

// Updates the status of the reservation
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
