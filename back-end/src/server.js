const { PORT = 5000 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  if (process.env.NODE_ENV == "development") {
    console.log("development Mode");
  }

  if (process.env.NODE_ENV == "production") {
    console.log("production Mode");
  }
  console.log(`Listening on Port ${PORT}!`);
}
