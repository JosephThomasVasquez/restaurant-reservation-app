const knex = require("../db/connection");

const list = () => {
  return knex("reservations").select("*");
};

module.exports = {
  list,
};
