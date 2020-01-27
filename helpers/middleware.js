// Require Modules Referenced
const fs = require("fs");
const path = require("path");

// Require Modules Used For Middleware
const helmet = require("helmet"); // Set Response Headers
const morgan = require("morgan"); // Logger
const rfs = require("rotating-file-stream"); // File Stream For Logger
const compression = require("compression"); // Compresses Response For Better Proformance
const cors = require("cors"); // Set Cross-Origin Response Headers
const favicon = require("serve-favicon"); // Handle Requests For Favicon
const bodyParser = require("body-parser"); // Request Body Parser
const cookieParser = require("cookie-parser"); // Parses Cookies Sent From Client
const session = require("express-session"); // Create A Session

const logDirectory = path.join(
  process.cwd(),
  "log",
);

function addproductionmiddleware(app) {
  app.use(helmet());

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }
  app.use(morgan("combined", {
    stream: rfs.createStream("access.log", {
      interval: "1d", // Rotate daily
      path: logDirectory,
    }),
  }));
  app.use(compression());
}

module.exports = (app) => {
  /*
   * Add Middleware To App
   * Configure Production Middleware
   */
  if (app.get("env") === "production") {
    addproductionmiddleware(app);
  }

  // Configure Rest of Middleware
  app.use(morgan("dev"));
  app.use(cors());
  app.use(favicon(path.join(
    __dirname,
    "..",
    "public",
    "favicon.ico",
  )));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(cookieParser());
  app.use(session({
    cookie: {
      httpOnly: true,
      maxAge: 300000,
      path: "/",
      sameSite: true,
      secure: true,
    },
    name: "sessionId",
    // Leave Default - "proxy": undefined,
    resave: false,
    rolling: false,
    saveUninitialized: true,
    secret: app.get("session secret"),
    unset: "keep",
  }));
  // Use if Needed - app.use(csurf()) // Configure if csurf is needed

  return app;
};
