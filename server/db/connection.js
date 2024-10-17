const mongooose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;

module.exports.DBConnection = () => {
  mongooose.connect(DB_URL);
  const db = mongooose.connection;
  db.on("error", console.error.bind(console, "DB connection error"));
  db.once("open", () => console.log("DB connected"));
};
