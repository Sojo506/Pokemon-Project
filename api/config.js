const PORT = process.env.PORT || 3001;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "Sojo8582";
const DB_NAME = process.env.DB_PASSWORD || "pokemon";

module.exports = {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
};