const r = require("express").Router();

const db = require('../../../config/database/sequelize')
const MovieUsecase = require('../../usecase/v1/movie')
const MovieDelivery = require('../../delivery/v1/movie')
const MovieRepos = require('../../repository/v1/movie')
const MovieRepository = require("../../repository/v1/movie_views");

const Movie = new MovieDelivery(new MovieUsecase(new MovieRepos(db),new MovieRepository(db)));

r.get("/", Movie.GetMovieList);
r.get("/trending", Movie.ViewTrendingMovie);
r.get("/watched", Movie.ViewWatchedMovie);
r.post("/", Movie.CreateMovie);
r.put("/", Movie.UpdateMovie);
r.get("/:id", Movie.GetMovieDetail);

module.exports = r;