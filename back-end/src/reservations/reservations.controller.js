const reservationsService = require("./reservations.service");
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

const hasFirstName = (req, res, next) => {
  const { data: { first_name } = {} } = req.body;

  if (!first_name) {
    return next({
      status: 400,
      message: `Reservation must have a first_name.`,
    });
  }
  next();
};

const hasLastName = (req, res, next) => {
  const { data: { last_name } = {} } = req.body;

  if (!last_name) {
    return next({
      status: 400,
      message: `Reservation must have a last_name.`,
    });
  }
  next();
};

const hasMobileNumber = (req, res, next) => {
  const { data: { mobile_number } = {} } = req.body;

  if (!mobile_number) {
    return next({
      status: 400,
      message: `Reservation must have a mobile_number.`,
    });
  }
  next();
};

const hasDate = (req, res, next) => {
  const { data: { reservation_date } = {} } = req.body;

  if (!reservation_date) {
    return next({
      status: 400,
      message: `Must have a reservation_date.`,
    });
  }

  res.locals.reservation_date = reservation_date;

  next();
};

const hasValidDate = (req, res, next) => {
  let isValid = new Date(res.locals.reservation_date).toString();
  console.log("isValid:", isValid);

  if (isValid === "Invalid Date") {
    return next({
      status: 400,
      message: `Must have a valid reservation_date format.`,
    });
  }
  next();
};

const hasTime = (req, res, next) => {
  const { data: { reservation_time } = {} } = req.body;

  if (!reservation_time) {
    return next({
      status: 400,
      message: `Must have a reservation_time.`,
    });
  }

  res.locals.reservation_time = reservation_time;

  next();
};

const hasValidTime = (req, res, next) => {
  const isValid = res.locals.reservation_time.match(
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  );

  if (!isValid) {
    return next({
      status: 400,
      message: `Must have a valid reservation_time.`,
    });
  }

  next();
};

const hasPeople = (req, res, next) => {
  const { data: { people } = {} } = req.body;

  if (!people) {
    return next({
      status: 400,
      message: `Must have at least 1 people.`,
    });
  }

  res.locals.people = people;

  next();
};

const hasMinPeople = (req, res, next) => {
  let people = res.locals.people;

  if (!people >= 1) {
    return next({
      status: 400,
      message: `Must have 1 or more people.`,
    });
  }
  next();
};

const peopleIsValid = (req, res, next) => {
  let isValid = res.locals.people;
  console.log("people:", isValid, "typeof:", typeof isValid);

  if (typeof isValid !== "number") {
    return next({
      status: 400,
      message: `The property people must be a number.`,
    });
  }
  next();
};

/*
--------------------------------------------------------------------------------
Resource Handlers
--------------------------------------------------------------------------------
*/

/* List handler for reservation resources
      /GET
 */
const list = async (req, res) => {
  // get reservations by date query
  const date = req.query.date;

  const data = await reservationsService.list(date);

  res.json({ data });
};

/* Create reservation handler
      /POST
*/

const create = async (req, res, next) => {
  try {
    const data = await reservationsService.create(req.body.data);
    console.log("created reservation::", data);

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasValidProperties),
    asyncErrorBoundary(hasFirstName),
    asyncErrorBoundary(hasLastName),
    asyncErrorBoundary(hasMobileNumber),
    asyncErrorBoundary(hasDate),
    asyncErrorBoundary(hasValidDate),
    asyncErrorBoundary(hasTime),
    asyncErrorBoundary(hasValidTime),
    asyncErrorBoundary(hasPeople),
    asyncErrorBoundary(hasMinPeople),
    asyncErrorBoundary(peopleIsValid),
    asyncErrorBoundary(create),
  ],
};
