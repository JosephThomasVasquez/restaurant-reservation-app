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

const searchByPhone = (mobile_number) => {
  return knex("reservations")
    .select("*")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_date");
  // .where("mobile_number", `like`, `%${mobile_number}%`)
  // .groupBy("reservation_id")
  // .orderBy("reservation_time");
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
  read,
  updateStatus,
  searchByPhone,
};
