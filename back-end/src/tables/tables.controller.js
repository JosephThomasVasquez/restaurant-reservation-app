const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { table } = require("../db/connection");

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
      message: `Missing data from the request body.`,
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

// ---------------------------------------------------------------------------------------------------------------

// Seat reservation - Table validation

const tableIsFree = (req, res, next) => {
  const { table_id, reservation_id } = res.locals.table;

  if (reservation_id) {
    return next({
      status: 400,
      message: `The table with ID ${table_id} is occupied by reservation ID ${reservation_id}. Please select another table.`,
    });
  }

  next();
};

const tableHasCapacity = (req, res, next) => {
  const { people } = res.locals.reservation;
  const { capacity } = res.locals.table;

  if (people > capacity) {
    return next({
      status: 400,
      message: `This table does not have the capacity for ${people} people. Please select a table that has equal or more capcity.`,
    });
  }

  next();
};

const tableIsNotOccupied = (req, res, next) => {
  const { table } = res.locals;

  if (table.reservation_id !== null) {
    next();
  } else {
    return next({
      status: 400,
      message: `The table ${table.table_id} is not occupied.`,
    });
  }
};

// ---------------------------------------------------------------------------------------------------------------

//  reservation_id validation
const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.body.data;

  if (!reservation_id) {
    return next({
      status: 400,
      message: `Property reservation_id is missing from request body.`,
    });
  }

  const reservation = await reservationsService.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else {
    next({
      status: 404,
      message: `Reservation with ID ${reservation_id} not found.`,
    });
  }
};

const statusIsSeated = async (req, res, next) => {
  const { reservation_id, status } = res.locals.reservation;

  if (status === "seated") {
    return next({
      status: 400,
      message: `The reservation ${reservation_id} is already seated at a table.`,
    });
  }

  next();
};

const tableExists = async (req, res, next) => {
  const { table_id } = req.params;

  const table = await tablesService.read(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }

  next({
    status: 404,
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
  const { table_id } = res.locals.table;

  const { reservation_id } = req.body.data;

  const data = await tablesService.update(table_id, reservation_id);

  res.json({ data });
};

const destroy = async (req, res, next) => {
  const { table_id, reservation_id } = res.locals.table;

  console.log("table table table:", res.locals.table);

  await tablesService.resetTable(table_id, reservation_id);

  res.status(200).json({});
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
  update: [
    asyncErrorBoundary(hasValidProperties),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(statusIsSeated),
    asyncErrorBoundary(tableIsFree),
    asyncErrorBoundary(tableHasCapacity),
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableIsNotOccupied),
    asyncErrorBoundary(destroy),
  ],
};
