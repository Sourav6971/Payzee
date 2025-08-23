const pg = require("pg").Pool;

const config = {};

const pool = pg.Client({
  config,
});
