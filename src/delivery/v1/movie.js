const response = require("../../../config/response");

class MovieDelivery {
  constructor(
    movieUsecase,
    ) {
    this.movieUsecase = movieUsecase;
  }

  GetMovieDetail = async (req, res) => {
    try {
      const movie = await this.movieUsecase.ViewMovieDetail(+req.params.id);
      return res.status(200).json(response.success(200, "Success", movie));
    } catch (error) {
      return res.status(400).json(response.failed(400, "Failed to retrieve movie"));
    }
  }

  GetMovieList = async (req, res) => {
    try {
      const movies = await this.movieUsecase.ViewMovieList({
        limit: req.query.limit, 
        page: req.query.page,
        search: req.query.search
      });
      return res.status(200).json(response.success(200, "Success", movies));
    } catch (error) {
      return res.status(400).json(response.failed(400, "Failed to retrieve movie"));
    }
  }

  CreateMovie = async (req, res) => {
    try {
      const movies = await this.movieUsecase.CreateMovie(req.body);
      return res.status(200).json(response.success(201, "Successfully created", null));
    } catch (error) {
      return res.status(400).json(response.failed(400, "Failed to create movie"));
    }
  }

  UpdateMovie = async (req, res) => {
    try {
      const movies = await this.movieUsecase.UpdateMovie(req.body);
      return res.status(200).json(response.success(200, "Successfully updated", null));
    } catch (error) {
      return res.status(400).json(response.failed(400, "Failed to updated movie"));
    }
  }
}

module.exports = MovieDelivery;