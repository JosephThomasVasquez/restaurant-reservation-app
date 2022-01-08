const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
const list = async (req, res) => {
  const data = await reservationsService.list();

  res.json({ data });
};

const create = async (req, res) => {
  const { data } = req.body;

  console.log("req.body:", data);

  res.status(201).json({ data });
};

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
};
