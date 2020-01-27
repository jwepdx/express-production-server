const createError = require("http-errors");
const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Set basic application settings
require("./helpers/settings.js")(app);

// Set custom application settings
app.set("session secret", process.env.SESSION_SECRET || "unknown session secret");

// Set application middleware
require("./helpers/middleware.js")(app);

// Set application static paths
app.use(express.static(path.join(__dirname, "public")));

// Add routers to application
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, _next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development"
    ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
