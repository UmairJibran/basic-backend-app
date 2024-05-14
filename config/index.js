const path = require("path");

const convict = require("convict");
const convict_format_with_validator = require("convict-format-with-validator");

// Add all formats
convict.addFormats(convict_format_with_validator);

// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test", "test_remote"],
    default: "development",
    env: "NODE_ENV",
    arg: "env",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT",
    arg: "port",
  },
  db: {
    type: {
      doc: "Database Type",
      format: String,
      default: "mysql",
      env: "DB_TYPE",
    },
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "127.0.0.1",
      env: "DB_HOST",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "database_development",
      env: "DB_NAME",
    },
    username: {
      doc: "db user",
      format: String,
      default: "root",
      env: "DB_USERNAME",
    },
    password: {
      doc: "db password",
      format: "*",
      default: null,
      env: "DB_PASSWORD",
    },
  },
  secretKey: {
    doc: "Secret to validate JWT Tokens",
    format: "string",
    default: "LaiwV87cidshEBP8aUtsZbsnL0wAsdZhWhheTSg8",
    env: "JWT_TOKEN",
  },
});

// Load environment dependent configuration
let env = config.get("env");
console.log("environment is", env);
if (env === "development" || env === "test") {
  config.loadFile(path.join(__dirname, "environments", `${env}.json`));
}
if (env === "test_remote") {
  path.join(path.join(__dirname, `${env}.json`));
  config.loadFile(__dirname + "/" + env + ".json");
}

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
