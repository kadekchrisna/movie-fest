const r = require("express").Router();
const MovieRoute = require("./v1/movie");

r.use("/v1/movie", MovieRoute);

module.exports = r;
