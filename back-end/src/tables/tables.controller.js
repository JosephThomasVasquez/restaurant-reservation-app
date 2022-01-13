const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/*
--------------------------------------------------------------------------------
Validation handlers
--------------------------------------------------------------------------------
*/

// Checks if request body values are valid
const hasValidProperties = (req, res, next) => {
  if (!req.body.data)
    return next({
      status: 400,
      message: `Data from the request body is missing.`,
    });

  next();
};

const hasTableName = (req, res, next) => {
  const { data: { table_name } = {} } = req.body;

  if (!table_name) {
    return next({
      status: 400,
      message: `Table must have a table_name.`,
    });
  }

  res.locals.table_name = table_name;
  next();
};

const validTableCharacterLength = (req, res, next) => {
  if (res.locals.table_name.length < 2) {
    return next({
      status: 400,
      message: `Table must have a table_name.`,
    });
  }
  next();
};

const hasCapacity = (req, res, next) => {
  const { data: { capacity } = {} } = req.body;

  if (!capacity) {
    return next({
      status: 400,
      message: `Table must have a capacity.`,
    });
  }

  res.locals.capacity = capacity;
  next();
};

const hasMinCapacity = (req, res, next) => {
  if (res.locals.capacity <= 0) {
    return next({
      status: 400,
      message: `Table must have a table_name.`,
    });
  }
  next();
};

const capacityIsNaN = (req, res, next) => {
  console.log("capacity?", typeof res.locals.capacity);
  if (typeof res.locals.capacity !== "number") {
    return next({
      status: 400,
      message: `The property capacity must have a number.`,
    });
  }
  next();
};

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
  create: [
    asyncErrorBoundary(hasValidProperties),
    asyncErrorBoundary(hasTableName),
    asyncErrorBoundary(validTableCharacterLength),
    asyncErrorBoundary(hasCapacity),
    asyncErrorBoundary(hasMinCapacity),
    asyncErrorBoundary(capacityIsNaN),
    asyncErrorBoundary(create),
  ],
};
