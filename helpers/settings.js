const path = require("path");

function setViews(app) {
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view cache", true);
  app.set("view engine", "ejs");
}

function jsonSettings(app) {
  app.set("jsonp callback name", "callback");
  app.set("json escape", true);
  // Leave at Default - app.set("json replacer", undefined);
  app.set("json spaces", "\t");
}

module.exports = (app) => {
  app.set("case sensitive routing", true);
  app.set("env", process.env.NODE_ENV || "development");
  app.set("etag", "strong");
  jsonSettings(app);
  setViews(app);
  app.set("query parser", false);
  app.set("strict routing", true);
  app.set("trust proxy", true);
  app.set("x-powered-by", false);

  return app;
};
