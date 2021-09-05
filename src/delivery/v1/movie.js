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
      return res.status(200).json(response.success(200, "OK", movie));
    } catch (error) {
      return res.status(400).json(response.failed(200, "Failed to retrieve movie"));
    }
  }
}

module.exports = MovieDelivery;