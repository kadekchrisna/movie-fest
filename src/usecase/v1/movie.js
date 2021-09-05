const Movie = require('../../model/v1/movie')

class MovieUsecase {
  constructor(movieRepo) {
    this.movieRepo = movieRepo;
  }
    
  async ViewMovieDetail(id) {
    try {
      const movie = await this.movieRepo.Get({id: id})
      return movie
    } catch (e) {
      return e;
    }
  }
}

module.exports = MovieUsecase;