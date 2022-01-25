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

// DATE VALIDATORS --------------------------------------------------------------------

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

  if (isValid === "Invalid Date") {
    return next({
      status: 400,
      message: `Must have a valid reservation_date format.`,
    });
  }
  next();
};

const dateNotAvailable = (req, res, next) => {
  let getDate = new Date(res.locals.reservation_date).getDay();
  let closedDay = 1;

  if (getDate === closedDay) {
    return next({
      status: 400,
      message: `Sorry, we are closed on that day.`,
    });
  }
  next();
};

const dateInFuture = (req, res, next) => {
  const today = Date.now();
  const validDate = new Date(res.locals.reservation_date).getTime();

  if (today > validDate) {
    return next({
      status: 400,
      message: `Must select a date in the future.`,
    });
  }
  next();
};

// TIME VALIDATORS --------------------------------------------------------------------

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

const timeIsFuture = (req, res, next) => {
  const reservationHours = { start: "10:29:59", end: "21:29:59" };

  const time = res.locals.reservation_time;

  if (time > reservationHours.start && time < reservationHours.end) {
    return next();
  } else {
    next({
      status: 400,
      message: `Must have a valid reservation_time.`,
    });
  }
};

// PEOPLE VALIDATORS --------------------------------------------------------------------

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

  if (typeof isValid !== "number") {
    return next({
      status: 400,
      message: `The property people must be a number.`,
    });
  }
  next();
};

const reservationExists = async (req, res, next) => {
  const { reservationId } = req.params;
  // console.log("params", req.params);
  // console.log("reservation ID:", reservationId);

  const reservation = await reservationsService.read(reservationId);

  console.log("reservationExists:", reservation);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  next({
    status: 404,
    message: `Reservation with ID ${reservationId} not found.`,
  });
};

// veryify if status from the body is a valid status
const validateStatus = async (req, res, next) => {
  const { status } = req.body.data;

  const validStatus = ["booked", "seated", "finished", "cancelled"];

  if (!validStatus.includes(status)) {
    next({
      status: 400,
      message: `The status property ${status} must be one of these values ${validStatus.join(
        ", "
      )}.`,
    });
  }
  next();
};

const isFinished = (req, res, next) => {
  const { status } = res.locals.reservation;

  if (status === "finished") {
    return next({
      status: 400,
      message: `Cannot update a reservation that is already finished.`,
    });
  }

  next();
};

const isBooked = (req, res, next) => {
  const { status } = req.body.data;
  console.error("STATUS:", status);

  if (status) {
    if (status !== "booked") {
      next({
        status: 400,
        message: `A new reservation cannot have a status of ${status}.`,
      });
    }
  }
  next();
};

const searchByNumber = (req, res, next) => {
  const query = req.query;

  console.log("query", query);
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
  const date = req.query.date;
  const mobile_number = req.query.searchNumber;

  let data = null;

  if (date) {
    data = await reservationsService.listByDate(date);
  } else if (mobile_number) {
    console.log(mobile_number);
    data = await reservationsService.searchByPhone(mobile_number);
  } else {
    data = await reservationsService.list(date);
  }

  res.json({ data });
};

/* Create reservation handler
      /POST
*/

const create = async (req, res, next) => {
  try {
    const data = await reservationsService.create(req.body.data);

    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

const read = (req, res, next) => {
  const data = res.locals.reservation;

  res.json({ data });
};

const updateStatus = async (req, res, next) => {
  const { reservation_id } = res.locals.reservation;
  const { status } = req.body.data;

  const data = await reservationsService.updateStatus(reservation_id, status);

  console.log("updateStatus DATA:", data);

  res.json({ data });
};

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasValidProperties),
    asyncErrorBoundary(isBooked),
    asyncErrorBoundary(hasFirstName),
    asyncErrorBoundary(hasLastName),
    asyncErrorBoundary(hasMobileNumber),
    asyncErrorBoundary(hasDate),
    asyncErrorBoundary(hasValidDate),
    asyncErrorBoundary(dateInFuture),
    asyncErrorBoundary(dateNotAvailable),
    asyncErrorBoundary(hasTime),
    asyncErrorBoundary(hasValidTime),
    asyncErrorBoundary(timeIsFuture),
    asyncErrorBoundary(hasPeople),
    asyncErrorBoundary(hasMinPeople),
    asyncErrorBoundary(peopleIsValid),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(validateStatus),
    asyncErrorBoundary(isFinished),
    asyncErrorBoundary(updateStatus),
  ],
  search: asyncErrorBoundary(searchByNumber),
};
