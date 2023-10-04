const { Sequelize } = require("sequelize");

const sequalize = new Sequelize("marwadtech", "root", "@Dilip2003", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequalize;
