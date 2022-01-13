const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/*
--------------------------------------------------------------------------------
Validation handlers
--------------------------------------------------------------------------------
*/

/*
--------------------------------------------------------------------------------
Resource Handlers
--------------------------------------------------------------------------------
*/

/* List handler for tables resources
      /GET
 */
const list = async (req, res) => {
  // get reservations by date query
  // const date = req.query.date;

  const data = await tablesService.list();
  console.log(data);

  res.json({ data });
};

const create = async (req, res, next) => {
  try {
    const data = await tablesService.create(req.body.data);
    console.log("created table:", data);

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
};
