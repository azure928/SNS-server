require('dotenv').config();

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DIALECT,
  define: {
    timestamps: false,
  },
  pool: {
    max: Number(process.env.MIN),
    min: Number(process.env.MAX),
  },
};
