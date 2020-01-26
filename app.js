const createError = require("http-errors");
const express = require("express");
const path = require("path");


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// set basic application settings
require("./helpers/settings.js")(app);

// set custom application settings
app.set("session secret", "unknown session secret");

// set application middleware
require("./helpers/middleware.js")(app);

// set application static paths
app.use(express.static(path.join(__dirname, "public")));

// add routers to application
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
