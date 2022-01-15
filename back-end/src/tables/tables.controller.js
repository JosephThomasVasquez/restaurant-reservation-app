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
  if (typeof res.locals.capacity !== "number") {
    return next({
      status: 400,
      message: `The property capacity must have a number.`,
    });
  }
  next();
};

const tableExists = async (req, res, next) => {
  const { table_id } = req.params;

  const table = await tablesService.read(table_id);

  if (table) {
    console.log("found table", table);
    res.locals.table = table;
    return next();
  }

  next({
    status: 400,
    message: `No table found with ID ${table_id}.`,
  });
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
  const data = await tablesService.list();

  res.json({ data });
};

/* Create table handler
      /POST
*/

const create = async (req, res, next) => {
  try {
    const data = await tablesService.create(req.body.data);

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  console.log("found table", res.locals.table.table_id);

  const { table_id } = res.locals.table;

  //   const table_id = req.params.table_id;
  const { reservation_id } = req.body.data;

  const data = tablesService.update(table_id, reservation_id);

  res.json({ data });
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
  update: [asyncErrorBoundary(tableExists), asyncErrorBoundary(update)],
};
