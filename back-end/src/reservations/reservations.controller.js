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

  const invalidProperties = [];
  console.log("For initial commit backend");

  // Check properties
  for (let property in req.body.data) {
    !req.body.data[property] && invalidProperties.push(property);
  }

  // console.log("invalidProperties", invalidProperties);

  if (invalidProperties.length) {
    return next({ status: 400, message: `${invalidProperties} is required.` });
  }

  next();
};

/* List handler for reservation resources
      /GET
 */
const list = async (req, res) => {
  const data = await reservationsService.list();

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
  create: [asyncErrorBoundary(hasValidProperties), asyncErrorBoundary(create)],
};
