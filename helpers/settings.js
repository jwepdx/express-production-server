module.exports = function(app) {
  "use strict";
  app.set("case sensitive routing", true);
  app.set("env", process.env.NODE_ENV || "development");
  app.set("etag", "strong");
  app.set("jsonp callback name", "callback");
  app.set("json escape", true);
  app.set("json replacer", undefined);
  app.set("json spaces", "\t");
  app.set("query parser", false);
  app.set("strict routing", true);
  app.set("trust proxy", true);
  app.set("views", require("path").join(__dirname, "..", "views"));
  app.set("view cache", true)
  app.set("view engine", "ejs");
  app.set("x-powered-by", false);
  return app;
};
