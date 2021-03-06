const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("config");
module.exports = function() {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => logger.info(`Connected to ${db} ...`))
    .catch(() => console.error(`Could not connect to ${db}`));
};
