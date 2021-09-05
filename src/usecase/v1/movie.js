const Pagination = require('../../../config/util/pagination')

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
    
  async ViewMovieList(params) {
    try {
      const baseFilter = Pagination.defaultPaginate(params)
      const movie = await this.movieRepo.Select({
        limit: baseFilter.Limit,
        offset: baseFilter.offset,
        search: params.search
      })
      return movie
    } catch (e) {
      return e;
    }
  }
    
  async CreateMovie(params) {
    try {
      return this.movieRepo.Create(params)
    } catch (e) {
      return e;
    }
  }
    
  async UpdateMovie(params) {
    try {
      return this.movieRepo.Update(params)
    } catch (e) {
      return e;
    }
  }
}

module.exports = MovieUsecase;